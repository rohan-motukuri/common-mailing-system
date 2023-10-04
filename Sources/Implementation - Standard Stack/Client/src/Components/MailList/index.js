import { useState, useEffect, useRef, useDebugValue } from 'react'
import { db, fb } from '../Firebase';

import "../../CSS/MailList.css";
import Mail_Item from '../Mail_Item';

let subscriberAddress;

class Mail_Item_Structure {
    constructor (data, ref) {
        this._refPath = ref;
        // this.data = data;

        this.latestSubject     = data.latestDetails.subject;
        this.latestRecieved    = data.latestDetails.recieved;
        this.latestSender      = data.latestDetails.sender;
        this.latestAttachments = data.latestAttachments;

        this.threadID       = data.threadID;
        this.subscriptionID = data.subscriptionID;

        this.isStarred = false; db.doc(`Subscribers/${subscriberAddress}/Starred/main`).get().then(starredDoc => this.isStarred = starredDoc.data()?.main?.includes(`${this.subscriptionID}+${this.threadID}`));
        this.isTrashed = false; db.doc(`Subscribers/${subscriberAddress}/Starred/main`).get().then(starredDoc => this.isTrashed = starredDoc.data()?.main?.includes(`${this.subscriptionID}+${this.threadID}`));
    }

    _toggle(prop, list) {
        const itemKey = `${this.subscriptionID}+${this.threadID}`;
        const ref = db.doc(`Subscribers/${subscriberAddress}/${prop}/main`);

        if(list.includes(itemKey))
        ref.update({
            'main': fb.FieldValue.arrayRemove(itemKey)
        }).then(() => {
            this[`is${prop}`] = false;
        })
    else 
        ref.update({
            'main': fb.FieldValue.arrayUnion(itemKey)
        }).then(() => {
            this[`is${prop}`] = true;
        })
    }

    toggleStar(starredList) {
        this._toggle('Starred', starredList);
    }

    toggleTrash(trashedList) {
        this._toggle('Trashed', trashedList);
    }

    onClick (setMode, setSelectedThread) {
        setSelectedThread({
            thread:       this.threadID,
            subscription: this.subscriptionID
        });
        setMode("mail");
    }
}

function MailList({ subscriber, selectedSubscription, mode, setMode, subscriptionList, setSelectedThread, searchQuery }) {
    subscriberAddress = subscriber.address;

    const [threadsTracker, setThreadsTracker] = useState({});
    const [internalState_trigSnap, setIntenalState_trigSnap] = useState(() => false);
    const [starredList, setStarredList] = useState([]);
    const [trashedList, setTrashedList] = useState([]);

    useEffect(() => {
        console.log("Dev-Status: Snapping Starred @ Passive Display");
        const unsubscribe = db.doc(`Subscribers/${subscriber.address}/Starred/main`).onSnapshot(snap => {
            const listOfStarred = snap.data().main;

            setStarredList(listOfStarred);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        console.log("Dev-Status: Snapping Trashed @ Passive Display");
        const unsubscribe = db.doc(`Subscribers/${subscriber.address}/Trashed/main`).onSnapshot(snap => {
            const listOfTrashed = snap.data().main;

            setTrashedList(listOfTrashed);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        setThreadsTracker(subscriptionList.reduce((a, v) => ({ ...a, [v]: {}}), {}));
        setIntenalState_trigSnap(!internalState_trigSnap);
    }, [subscriptionList]);

    useEffect(() => {
        console.log("Dev-Status: Snapping Threads @ Passive Display");

        const unsubscribe = db.collection(`Threads`).onSnapshot(snap => {
            console.log("Dev-Status: In Snapshot @ Passive Display");
            let workingObj = {...threadsTracker};
            snap.docChanges().forEach(threadDoc => {
                const threadParser   = JSON.parse(threadDoc.doc.id);
                const threadID       = threadParser.thread;
                const subscriptionID = threadParser.address;

                if(workingObj[subscriptionID]) {
                    workingObj[subscriptionID][threadID] = new Mail_Item_Structure(threadDoc.doc.data(), threadDoc.doc.ref);
                }
            });

            setThreadsTracker(workingObj);
        })

        return () => {
            unsubscribe();
        }
    }, [internalState_trigSnap]);

    useEffect(() => {
        setMode("search")
    }, [searchQuery])

    // useEffect(() => {
    //     console.log('Dev-Status: Snapping Threads @ Passive Display ');

    //     let unsubscribe = ()=>{};
        
    //     if (mode === "list") { // Requires Optimization
    //         unsubscribe = db.collection(`Subscriptions/${selectedSubscription}/threads`).onSnapshot(snap => {
    //             let workingObj = {...threadsTracker};
    //             snap.docs.forEach(thread => {
    //                 const data = thread.data();
    //                 const ref = thread.ref.path;

    //                 if(workingObj[selectedSubscription]) {
    //                     if(workingObj[selectedSubscription][data.threadID]) {
    //                         workingObj[selectedSubscription][data.threadID].data = data;
    //                     } else {
    //                         workingObj[selectedSubscription][data.threadID] = new Mail_Item_Structure(data, ref);
    //                     }
    //                 } else {
    //                     workingObj[selectedSubscription] = {};
    //                     workingObj[selectedSubscription][data.threadID] = new Mail_Item_Structure(data, ref);
    //                 }

    //             });  
    //             setThreadsTracker(workingObj);
    //         });
    //     } 

    //     if (mode === "star") { // Requires Optimization?
    //         unsubscribe = db.collection(`Subscribers/${subscriber}/starred`).onSnapshot(snap => {
    //             const data = snap.docChanges().forEach(ref => {

    //             })
    //         });
    //     }

    //     if(mode === "trash") {
    //         unsubscribe = db.collection(`Subscribers/${subscriber}/trashed`).onSnapshot(snap => {
    //             const data = snap.docChanges().forEach(ref => {
    //                 ref.doc.data();
    //             });
    //         });
    //     }

    //     return () => {
    //         console.log("Dev-Status: Cleaning Previous Firebase Listener @ Passive Display");
    //         unsubscribe();
    //      }
    // }, [selectedSubscription, mode]);    

    const handleListRendering = (list_accessor, listObject = threadsTracker) => {
        if(listObject[list_accessor]) {
            return Object.keys(listObject[list_accessor]).map(thread => {
                const currentThread = listObject[list_accessor][thread];
                const sender      = currentThread.latestSender,
                      recieved    = currentThread.latestRecieved,
                      subject     = currentThread.latestSubject,
                      attachments = currentThread.latestAttachments

                return <Mail_Item 
                        sender      = {sender} 
                        recieved    = {recieved} 
                        subject     = {subject} 
                        attachments = {attachments}/>
            });
        }
        
        return null;
    }
    const handleSearchForQuery = (query = "") => {
        const matchedSubsetsAsHTMl = (baseText = "", searchString = query) => {
            let returningSubset = [];
            let lastPosition = 0;
            let hitIndex = 0;
            
            while ((hitIndex = baseText.indexOf(searchString, lastPosition)) >= 0) {
                returningSubset.push(baseText.substring(lastPosition, hitIndex));
                returningSubset.push(<i>
                    {searchString}
                </i>)

                lastPosition = hitIndex + searchString.length;
            }

            return returningSubset;
        }
        return Object.keys(threadsTracker[selectedSubscription]).map(thread => {
            const currentThread = threadsTracker[selectedSubscription][thread];
            const sender      = matchedSubsetsAsHTMl(currentThread.latestSender, query),
                  recieved    = matchedSubsetsAsHTMl(currentThread.latestRecieved, query),
                  subject     = matchedSubsetsAsHTMl(currentThread.latestSubject, query),
                  attachments = matchedSubsetsAsHTMl(currentThread.latestAttachments, query)
            
            // currentThreadSchema
            // latestSubject     : String
            // latestRecieved    : Date
            // latestSender      : String // Email Address
            // latestAttachments : Array(String) // Array of Attachment File Names

            
            return <Mail_Item 
                    sender      = {sender} 
                    recieved    = {recieved} 
                    subject     = {subject} 
                    attachments = {attachments}/>
        })
    }

    return (<div className='Mail_List_Parent'>
        {
            mode === "list" ? (
                handleListRendering(selectedSubscription)
            ) : 
            mode === "star" ? (
                handleListRendering("starred")
            ) : 
            mode === "trash" ? (
                handleListRendering("trashed")
            ) : 
            mode === "search" ? (
                handleSearchForQuery(searchQuery)
            ) : null
        }
    </div>)
}

export default MailList