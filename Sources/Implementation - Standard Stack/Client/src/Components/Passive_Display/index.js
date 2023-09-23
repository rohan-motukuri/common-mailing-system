import { useState, useEffect, useRef } from 'react'
import { db } from '../Firebase'

import "../../CSS/Passive_Display.css"

class LinkedList_Node {
    constructor (now, prev = null, next = null) {
        this.prev = prev;
        this.now  = now;
        this.next = next;
    }

    trash () {
        
    }

    onClick () {

    }
}

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

class LinkedList {
    constructor () {
        this._head = null;
        this._last = null;
        this._curr = null;
    }

    setCurrentToTop () {
        this._curr = this._head;
        return this;
    }

    iterate () {
        const supe = this;
        let prev = null;
        return {
            [Symbol.iterator]() {
                return this;
            },
            next: () => {
                if(supe._curr.next != null) {
                    if(prev == supe._curr) {
                        supe._curr = supe._curr.next;
                        prev = supe._curr;
                    } else prev = supe._curr;
                    return { done: false, value:supe._curr };
                }

                return { done: true, value: supe._curr };
            }
        }
    }

    insert (now) {

        if(this._last) {
            this._last.next = new LinkedList_Node (now, this._last);
            this._last = this._last.next;
        } else {
            this._last = new LinkedList_Node (now);
        }
        
        if(!this._head) this._head = this._last;
        this._curr = this._last;

        return this;

    }

    updateToTop () {
        if(this._curr === null) {
            return this;
        } 

        if(this._curr.prev) this._curr.prev.next = this._curr.next;
        if(this._curr.next) this._curr.next.prev = this._curr.prev;

        this._head.prev = this._curr;
        this._curr.next = 
        this._curr.prev = null;

        this._curr.next = this._head;
        this._head = this._curr;

        return this;
    }
}

const threadHandler = () => {
    return {
        'listings': new LinkedList(),
        'mailings': new FixedCircularQueue()
    }
}

function Passive_Display({currentSubscription, subscriber}) {
    console.log("Dev-Status: Rendering Passive Display");

    const [starredSet, setStarredSet] = useState(() => new Set());
    const [trashedSet, setTrashedSet] = useState(() => new Set());
    const [object, setObject] = useState(() => {return {
        'subscription-address' : {
            'regular-threads': threadHandler(),
            'starred-threads': threadHandler(),
            'deleted-threads': threadHandler()
        }
    }});

    useEffect(() => {
        console.log('Dev-Status: Setting Sets @ Passive Display');
        db.doc(`Subscribers/${subscriber.address}`).get().then(x => {
            const data = x.data().threadModifiers;
            setStarredSet(new Set (data.starred));
            setTrashedSet(new Set (data.trashed));
        })
    }, []);

    useEffect(() => {
        console.log('Dev-Status: Snapping Threads @ Passive Display');
        const x = starredSet, y = trashedSet;
        db.collection(`Subscriptions/${currentSubscription}/Threads`).onSnapshot(snap => {
            snap.docChanges(); 
        });
    }, []);

    

    return (<>

    </>)
}

export default Passive_Display