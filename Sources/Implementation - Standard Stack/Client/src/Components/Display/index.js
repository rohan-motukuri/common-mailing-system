import { createContext, useEffect, useState } from 'react'
import { db } from '../Firebase'

import Downbar from '../Downbar';
import SideBar from '../SideBar';
import Listings from '../Listings';
import MailPage from '../MailPage';

export const SideDownBarContext = createContext();

function Display({ inMobile, subscriber }) {

    const bodiesListConstructor = (bodies, subscription) => {
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
            setSubscriptionList(snap.docs.map(t => t.id));
        })
    }, [])


    return (<>
        <SideDownBarContext.Provider value={{subscriptionList, selectedSubscription, setSelectedSubscription, mode, setMode}}>
            {inMobile ? <Downbar/> : <SideBar/>}
        </SideDownBarContext.Provider>
        
        {mode == "mail" ? <Listings/> : <MailPage/>}
    </>)
}

export default Display