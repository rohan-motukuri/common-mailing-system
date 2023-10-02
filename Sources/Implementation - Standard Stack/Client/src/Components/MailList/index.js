import { useState, useEffect, useRef } from 'react'
import { db } from '../Firebase';

class Listed_Mail_Item {
    constructor (data, ref) {
        this._refPath = ref;

        this.data = data;
    }

    toggleStar () {
        db.doc().update(/*{starred : {...starred, {this.data.threadID : ...x, }}}*/);
    }

    toggleTrash () {
        db.doc().update();
    }

    onClick ({setMode, setSelectedThread}) {
        setMode("mail");
        setSelectedThread(this.data.threadID);
    }
}

function MailList({ subscriber, selectedSubscription, mode, setMode, subscriptionList, setSelectedThread }) {
    const [threadsTracker, setThreadsTracker] = useState({});
    const [internalState_trigSnap, setIntenalState_trigSnap] = useState(() => false);

    const handleListRendering = (list_accessor) => {
        if(threadsTracker[list_accessor])
            return Object.keys(threadsTracker[list_accessor]).map(thread => <div className='mail_item' key={"mailList" + list_accessor + thread}> {threadsTracker[list_accessor][thread].data.threadID} </div>);
        
        return null;
    }

    useEffect(() => {
        setThreadsTracker(subscriptionList.reduce((a, v) => ({ ...a, [v]: {}}), {}));
        setIntenalState_trigSnap(!internalState_trigSnap);
    }, [subscriptionList])

    useEffect(() => {
        console.log("Dev-Status: Snapping Threads @ Passive Display");

        const unsubscribe = db.collection(`Threads`).onSnapshot(snap => {
            console.log("Dev-Status: In Snapshot @ Passive Display");
            let workingObj = {...threadsTracker};
            snap.docChanges().forEach(thread => {
                const threadParser = JSON.parse(thread.doc.id);
                const threadID     = threadParser.thread;
                const address      = threadParser.address;

                if(workingObj[address]) {
                    // workingObj[address].push();
                    if(!workingObj[address][threadID]) {
                        workingObj[address][threadID] = new Listed_Mail_Item(thread.doc.data(), thread.doc.ref);
                    } else {
                        workingObj[address][threadID] = new Listed_Mail_Item(thread.doc.data(), thread.doc.ref);
                    }   
                }
            });

            setThreadsTracker(workingObj);
        })

        return () => {
            unsubscribe();
        }
    }, [internalState_trigSnap]);

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
    //                         workingObj[selectedSubscription][data.threadID] = new Listed_Mail_Item(data, ref);
    //                     }
    //                 } else {
    //                     workingObj[selectedSubscription] = {};
    //                     workingObj[selectedSubscription][data.threadID] = new Listed_Mail_Item(data, ref);
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

    return (<>
        {
            mode === "list" ? (
                handleListRendering(selectedSubscription)
            ) : 
            mode === "star" ? (
                handleListRendering("starred")
            ) : 
            mode === "trash" ? (
                handleListRendering("trashed")
            ) : null
        }
    </>)
}

export default MailList