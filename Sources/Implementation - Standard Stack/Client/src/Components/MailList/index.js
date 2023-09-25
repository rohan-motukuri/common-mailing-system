import { useState, useEffect, useRef } from 'react'
import { db } from '../Firebase';

class Listed_Mail_Item {
    constructor (data) {
        this.data = data;
        this.isStarred = false;
        this.isTrashed = false;
    }

    toggleStar () {

    }

    toggleTrash () {
        
    }

    onClick ({setMode}) {
        setMode("mail");
    }
}

function MailList({ selectedSubscription, mode, setMode }) {
    const [threadsTracker, setThreadsTracker] = useState(()=> new Object ());

    useEffect(() => {
        console.log('Dev-Status: Snapping Threads @ Passive Display');
        
        if (mode == "list") { // Requires Optimization
            const unsubscribe = db.collection(`Subscriptions/${selectedSubscription}/threads`).onSnapshot(snap => {
                snap.docs.forEach(thread => {
                    const data = thread.data();
                    let workingObj = {...threadsTracker};
    
                    if(threadsTracker[selectedSubscription]) {
                        if(threadsTracker[selectedSubscription][data.threadID]) {
                            workingObj[selectedSubscription][data.threadID].data = data;
                        } else {
                            workingObj[selectedSubscription][data.threadID] = new Listed_Mail_Item(data);
                        }
                    } else {
                        workingObj[selectedSubscription] = {};
                        workingObj[selectedSubscription][data.threadID] = new Listed_Mail_Item(data);
                    }
    
                    setThreadsTracker(workingObj);
    
                });
                // console.log("Dev-Debug: Threads: " + snap.docChanges()[0]?.doc?.data()); 
            });
    
            return () => {
                console.log('Dev-Status: Unsubscribing from previous Firestore listener @ Passive Display');
                unsubscribe(); 
            };
        } 

        if (mode == "star") { // Requires Optimization?

        }

        if(mode == "trash") {

        }

    }, [selectedSubscription, mode]);    

    return (<>
        {
            mode == "list" ? (
                threadsTracker[selectedSubscription] ? Object.keys(threadsTracker[selectedSubscription]).map(thread => <div className='mail_item'> {threadsTracker[selectedSubscription][thread].data.threadID} </div>) : null
            ) : 
            mode == "star" ? (
                threadsTracker['starred'] ? Object.keys(threadsTracker['starred']).map(thread => <div className='mail_item'> {threadsTracker['starred'][thread].data.threadID} </div>) : null
            ) : 
            mode == "trash" ? (
                threadsTracker['trashed'] ? Object.keys(threadsTracker['trashed']).map(thread => <div className='mail_item'> {threadsTracker['trashed'][thread].data.threadID} </div>) : null
            ) : null
        }
    </>)
}

export default MailList