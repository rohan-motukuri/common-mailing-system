import { useState, useEffect, useDebugValue } from 'react'
import { db, fb } from '../Firebase'

import InMobile from "../InMobile";
import SideBar from '../SideBar';
import Passive_Display from '../Passive_Display';

const fetchInitiator = (subscriberID, subscriptionList) => { 
    console.log("Dev-Debug: At Fetch Initiator");
    const options = (params) => ({
        method: 'POST',
        body: JSON.stringify( params )
    });

    const gatewayDeploymentsDoc = db.doc(`ZenithSystem/GatewayDeployments`);
    gatewayDeploymentsDoc.get().then(firestoreDoc => {
        const gatewayDoc             = firestoreDoc.data().main;
        const gatewayLastTriggered   = gatewayDoc.latestDetails;
        const gatewayLatestTime      = new fb.Timestamp(...Object.values(gatewayLastTriggered.timestamp)).toDate();
        const gatewayLatestIndex     = gatewayLastTriggered.index;
        const gatewayDeployments     = gatewayDoc.deploymentURLs;
        const gatewayDeployment      = gatewayDeployments[(gatewayLatestIndex + 1) % gatewayDeployments.length];
        const gatewayDeploymentURL   = gatewayDeployment.url;
        const gatewayLastTriggeredOn = new fb.Timestamp(...Object.values(gatewayDeployment.lastTriggeredOn)).toDate();
        let res = null;

        if(new Date() - gatewayLastTriggeredOn == 5 && new Date() - gatewayLatestTime == 5) {
            while(!res || res.stackStillFull == true) {
                const args = {
                    latestThreadID  : res?.latestThreadID  || "",
                    latestMessageID : res?.latestMessageID || "",
                };

                const params = {
                    actions: 'assess',
                    subscriberID,
                    args
                }
    
                fetch(gatewayDeploymentURL, options(params)).then(res => res.json()).then(data => {
                    res = data;
                    const reWriteDoc = gatewayDoc;
                    gatewayDeploymentsDoc.update(...reWriteDoc);
                });
            }
        }
    });

    // db.doc(`ZenithSystem/GatewayDeployments`).get().then(gateWayDepDoc => {
    //     const gatewayDoc             = gateWayDepDoc.data();
    //     const gatewayLastTriggeredOn = gatewayDoc.main.lastDetails.lastTriggeredOn;
    //     const gatwayURL              = gatewayDoc.main.deploymentURLs[0];

    //     if (gatewayLastTriggeredOn >= 5)
    //     db.doc(`ZenithSystem/ServerDeployments`).get().then(serverDeploymentsDoc => {
    //         const deploymentsDoc = serverDeploymentsDoc.data().main;
    //         subscriptionList.forEach(subscription => {
    //             const params = {
    //                 action: 'assess',
    //                 subscriptionDeploymentURL: deploymentsDoc[subscription]
    //             };
    //             fetch(gatwayURL, options(params)).then(res => {
                    
    //             }).catch(err => console.log('Dev-Debug: Error in fetchInitiator: ' + err));
    //         })
    //     })
    // })
}

function Active_Display({ subscriber, searchQuery, inSearchMode, setInSearchMode, setIsOffline }) {
    console.log("Dev-Status: Rendering Active Display");

    const [selectedSubscription, setSelectedSubscription] = useState(0);
    const [mode, setMode] = useState("list"); // star, trash, list, mail, search
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
        const unsubscribe = db.collection(`Subscribers/${subscriber.address}/Subscriptions`).onSnapshot((snap) => {
            setSubscriptionList(snap.docs.map(doc => doc.id));
            fetchInitiator(subscriber.address, subscriptionList);
            // setBodiesList(snap.docs.map(doc => bodiesListElementalConstructor(doc.id, doc.data['Bodies']))) 
        })

        return () => {
            unsubscribe();
        }
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
                            subscriptionList={subscriptionList}
                            searchQuery={searchQuery}
                            setIsOffline={setIsOffline}/>
    </>)
}

export default Active_Display