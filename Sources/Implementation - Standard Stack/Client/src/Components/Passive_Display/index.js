import { useState } from 'react'

import "../../CSS/Passive_Display.css";
import MailList from '../MailList';
import MailPage from '../MailPage';

function Passive_Display({selectedSubscription, subscriber, mode, setMode, subscriptionList, searchQuery, setIsOffline}) {
    console.log("Dev-Status: Rendering Passive Display");
    const [selectedThread, setSelectedThread] = useState(null);
    
    return (<div className='Mailings_Main'>
        <div className='Mailings_Header'>
            
        </div>
        <div className='Mailings_Body'>
            {
                mode === "mail" ? 
                    <MailPage selectedThread={selectedThread}/> 
                : 
                    <MailList subscriber={subscriber} 
                    subscriptionList={subscriptionList} 
                    selectedSubscription={selectedSubscription} 
                    mode={mode} setMode={setMode} 
                    setSelectedThread={setSelectedThread} 
                    searchQuery={searchQuery}
                    setIsOffline={setIsOffline}/>
            }
        </div>
    </div>)

}

export default Passive_Display