import { createContext, useEffect, useState } from 'react'
import { db } from '../Firebase'

import SideBar from '../SideBar';
import Listings from '../Listings';
import MailPage from '../MailPage';

export const SideDownBarContext = createContext();

function Display({ inMobile, subscriber }) {
    console.log("Rendering Display");

    const bodiesConstructor = (rawData) => {
        return {};
    }

    const bodiesListElementalConstructor = (subscription, bodies = []) => {
        return {
            subscription: subscription,
            bodies: bodies
        }
    }

    const [subscriptionList, setSubscriptionList] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState(0);
    const [mode, setMode] = useState("list"); // star, trash, list, mail
    const [bodiesList, setBodiesList] = useState([]);

    useEffect(() => {
        db.collection("Subscribers/"+subscriber.address+"/Subscriptions").onSnapshot((snap) => {
            setSubscriptionList(snap.docs.map(doc => doc.id));

            // setBodiesList(snap.docs.map(doc => bodiesListElementalConstructor(doc.id, doc.data['Bodies'])))
        })
    }, [])


    return (<>
        <SideDownBarContext.Provider value={{subscriptionList, selectedSubscription, setSelectedSubscription, mode, setMode}}>
            <SideBar inMobile={inMobile}/>
        </SideDownBarContext.Provider>
        
        {mode == "mail" ? <MailPage/> : <Listings bodiesList = {bodiesList}/>}
    </>)
}

export default Display