import { useEffect, useState } from 'react'
import { db } from '../Firebase'

class Message_Item {
    constructor (data, ref) {
        this.data = data;
        this._ref = ref;
    }


}

function MailPage({ selectedThread }) {
    const [messagesTracker, setMessagesTracker] = useState({});

    useEffect (() => {
        const unsubscribe = db.collection(`Messages`).onSnapshot(snap => {
            const workingObj = {...messagesTracker};

            snap.docs.forEach(messageDoc => {
                const messageParser  = JSON.parse(messageDoc.id);
                const messageID      = messageParser.message;
                const threadID       = messageParser.thread;
                const subscriptionID = messageParser.subscription;

                if(selectedThread && threadID === selectedThread.thread && subscriptionID === selectedThread.subscription) {
                    // put in workingObj   
                    ((workingObj[subscriptionID] ??= {})[threadID] ??= []).push(new Message_Item(messageDoc.data(), messageDoc.ref));
                } else {

                }
            })

            setMessagesTracker(workingObj);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    return (<>
        {
            Object.keys(messagesTracker).map(message => <div>
                {messagesTracker[message].data.subject}
            </div>)
        }
    </>)
}

export default MailPage