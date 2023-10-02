import { useState, useEffect, useRef } from 'react'
import { db } from '../Firebase'

import "../../CSS/Passive_Display.css";
import MailList from '../MailList';
import MailPage from '../MailPage';

class Queue_Node {

}

class FixedCircularQueue {
    constructor () {

    }

    enqueue_front () {

    }

    enqueue_back () {

    }

    front () {

    }

    back () {
        
    }
}

const threadHandler = () => {
    return {
        'listings': [],
        'fetching': new FixedCircularQueue()
    }
}

function Passive_Display({selectedSubscription, subscriber, mode, setMode, subscriptionList}) {
    console.log("Dev-Status: Rendering Passive Display");

    const [starredSet, setStarredSet] = useState(() => new Set());
    const [trashedSet, setTrashedSet] = useState(() => new Set());
    const [fetchTracker, setFetchTracker] = useState(() => {});
    const [object, setObject] = useState(() => {return {
        'subscription-address' : {
            'regular-threads': threadHandler(),
            'starred-threads': threadHandler(),
            'deleted-threads': threadHandler()
        }
    }});
    const [fetchedCirclesObj, setFetchedCirclesObj] = useState (() => Object.create({
        starred: new FixedCircularQueue(),
        trashed: new FixedCircularQueue() 
    }));

    useEffect(() => {
        console.log('Dev-Status: Setting Sets @ Passive Display');

        db.doc(`Subscribers/${subscriber.address}`).get().then(x => {
            const data = x.data();

            setStarredSet(new Set (data.starred));
            setTrashedSet(new Set (data.trashed));
        })
    }, []);
    
    return (
        <div className='MailingsMain'>
            {mode == "mail" ? <MailPage/> : <MailList subscriber={subscriber} subscriptionList={subscriptionList} selectedSubscription={selectedSubscription} mode={mode} setMode={setMode}/>}
        </div>
    )
}

export default Passive_Display