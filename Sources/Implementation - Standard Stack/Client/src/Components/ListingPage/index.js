import React, { useEffect, useState } from 'react'

import MailList from "../MailList";

function ListingPage({ mode, subscriptionAddress, subscriber }) {
    const [] = useState();

    useEffect(()=>{
        // Query all the bodies from DB on every change to the Bodies column for the given Subscriber and Subscription
    },[])

    return (<>
        {[].map((singleMail) => <MailList/>)}
    </>)
}

export default ListingPage