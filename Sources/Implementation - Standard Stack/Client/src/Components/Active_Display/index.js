import { useState, useEffect } from 'react'
import { db } from '../Firebase'

import InMobile from "../InMobile";
import SideBar from '../SideBar';
import Passive_Display from '../Passive_Display';

function Active_Display({ subscriber }) {
    console.log("Dev-Status: Rendering Active Display");

    const [selectedSubscription, setSelectedSubscription] = useState(0);
    const [mode, setMode] = useState("list"); // star, trash, list, mail
    const [selectedMultipleBodies, setSelectedMultipleBodies] = useState(false);
    const [changeModeTo, setChangeModeTo] = useState('');
    const [subscriptionList, setSubscriptionList] = useState([]);
    const [bodiesList, setBodiesList] = useState([]);

    const inMobile = InMobile();

    const bodiesConstructor = (rawData) => {
        return {};
    }
    const bodiesListElementalConstructor = (subscription, bodies = []) => {
        return {
            subscription: subscription,
            bodies: bodies
        }
    }

    useEffect(() => {
        console.log('Dev-Status: Snapping Subscriptions @ Active Display')
        db.collection(`Subscribers/${subscriber.address}/Subscriptions`).onSnapshot((snap) => {
            setSubscriptionList(snap.docs.map(doc => doc.id));

            // setBodiesList(snap.docs.map(doc => bodiesListElementalConstructor(doc.id, doc.data['Bodies'])))
        })
    }, [])

    return (<>
        <SideBar    subscriptionList={subscriptionList} 
                    selectedSubscription={selectedSubscription} 
                    setSelectedSubscription={setSelectedSubscription} 
                    mode={mode} setMode={setMode} 
                    inMobile={inMobile} 
                    setChangeModeTo={setChangeModeTo} 
                    selectedMultipleBodies={selectedMultipleBodies}/>

        <Passive_Display    mode={mode} 
                            setMode={setMode}
                            subscriber={subscriber} 
                            selectedSubscription={subscriptionList[selectedSubscription]} 
                            bodiesList = {bodiesList} 
                            changeModeTo={changeModeTo} 
                            setSelectedMultipleBodies={setSelectedMultipleBodies}
                            subscriptionList={subscriptionList}/>
    </>)
}

export default Active_Display