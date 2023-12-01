import { memo } from 'react'

import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';

import '../../CSS/Sidebar.css'

function SideBar({ inMobile, setMode, mode, subscriptionList, selectedSubscription, setSelectedSubscription }) {
    console.log("Dev-Status: Rendering Sidebar");

    const setMode_Wrapper = (mode = 'list') => {
        setMode(mode);
    }
    const setSelectedSubscription_Wrapper = (mode_set = 'list', subscription_set) => {
        if(mode_set == 'list') {
            
            if(inMobile) {
                if(mode_set == 'mail') {

                }
            } 
            else if(selectedSubscription != subscription_set) // Added this condition to hotfix the bug where active display was re-rendering everytime the selected mail was being pressed on again
                setSelectedSubscription(subscription_set);
        }

        if(mode_set == 'mail') {

        }

        if(mode != mode_set) setMode_Wrapper(mode_set);
    }
    
    // Define UI Components
    // Dependencies <Consumption Relation>
    // |- subscriptionList < as a map
    // |- setMode >
    // |- setCurrentSubscription >
    // |- mode <
    // |- currentSubscription <

    return (<>
        <div className='SideBar_Main'>
            <ul>
                {
                    inMobile ? (<li className={'SideBar_List '+ (mode == "list" || mode == "mail" || mode == "search" ? 'List-Selected ' : '')} onClick={()=> setSelectedSubscription_Wrapper('list')}><InboxTwoToneIcon/></li>) : (null)
                }
                <li style={{ userSelect: "none" }} className={'SideBar_List ' + (mode == 'trash' ? 'List-Selected ' : '')} onClick={()=> setSelectedSubscription_Wrapper('trash')}>
                    <DeleteTwoToneIcon/> 
                    {inMobile ? null : <p className='list_text'>Deleted Mails</p> }
                </li>
                <li style={{ userSelect: "none" }} className= {'SideBar_List ' + (mode == "star" ? 'List-Selected ' : '')} onClick={()=> setSelectedSubscription_Wrapper('star')}>
                    <StarTwoToneIcon/>  
                    {inMobile ? null : <p className='list_text'>Starred Mails</p> }
                </li>
                {
                    inMobile ? (<li className='SideBar_List ' ><MoreVertIcon/></li>) : (null)
                }
                {
                    inMobile ? (null) : subscriptionList.map((subscriber, index) => 
                    <li className={'SideBar_List ' + ((mode === "list" || mode === "mail" || mode =="search") && index == selectedSubscription ? 'List-Selected ' : '')} key={subscriber + "_sidebarelement"} onClick={() => setSelectedSubscription_Wrapper('list', index)} style={{ userSelect: "none" }}> 
                        <InboxTwoToneIcon/> <p className='list_text'>{subscriber}</p>
                    </li>)
                }
            </ul>
        </div>
    </>)

}

export default SideBar