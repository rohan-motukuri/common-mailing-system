import React, { useEffect, useState } from 'react'
import ListingPage from '../ListingPage';
import MailPage from '../MailPage';

function SideBar({ subscriber }) {

    const [mailClicked, setMailClicked] = useState("");
    const [mode, setMode] = useState("mail"); // Can be -- 'mail', 'star', 'trash'
    const [subscriptionList, setSubscriptionList] = useState(null);
    const [currentSubscription, setCurrentSubscription] = useState("");

    // Define UI Components
    // Dependencies <Consumption Relation>
    // |- subscriptionList < as a map
    // |- setMode >
    // |- setCurrentSubscription >
    // |- mode <
    // |- currentSubscription <

    useEffect(() => {
        // Query All The Subscriptions from DB on every change to the Subscriptions column for the given Subscriber
        let x = [];
        // Update x
        setSubscriptionList(...subscriptionList, ...x);

        if(currentSubscription.length == 0) setCurrentSubscription(x[0]);   // instead of subscriptionList[0] so it isn't triggered as 
                                                                            //a re-render when setSubscriptionList is called just a line prior.
    }, [/*change to the Subscriptions column*/])


    if(mailClicked.length) return (<>
        <MailPage setMailClicked={setMailClicked} mailClicked={mailClicked}/>
    </>);

    
    return (<>
        <ListingPage mode={mode} subscriber={subscriber} subscriptionAddress={currentSubscription} setMailClicked={setMailClicked}/>
    </>)
}

export default SideBar