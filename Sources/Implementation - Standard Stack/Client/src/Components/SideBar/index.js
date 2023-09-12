import { useEffect, useState, useContext, memo } from 'react'
import { SideDownBarContext } from '../Display';

import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';

import '../../CSS/Sidebar.css'

function SideBar({ subscriber, inMobile }) {

    const SideBarContexter = useContext(SideDownBarContext);

    const mode = SideBarContexter.mode;
    const selectedSubscription= SideBarContexter.selectedSubscription;
    const setMode_Wrapper = (mode = 'list') => {
        SideBarContexter.setMode(mode);
    }
    const setSelectedSubscription_Wrapper = (mode_set = 'list', subscription_set) => {
        if(mode_set == 'list') {
            
            if(inMobile) {
                if(mode_set == 'mail') {

                }
            }else SideBarContexter.setSelectedSubscription(subscription_set);
        }

        if(mode_set == 'mail') {

        }

        if(mode != mode_set) setMode_Wrapper(mode_set);
    }
    const subscriptionList = SideBarContexter.subscriptionList;

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
                    inMobile ? (<li className={'SideBar_List '+ (mode == "list" || mode == "mail" ? 'List-Selected ' : '')} onClick={()=> setSelectedSubscription_Wrapper('list')}><InboxTwoToneIcon/></li>) : (null)
                }
                <li className={'SideBar_List ' + (mode == 'trash' ? 'List-Selected ' : '')} onClick={()=> setSelectedSubscription_Wrapper('trash')}>
                    <DeleteTwoToneIcon/> 
                    {inMobile ? null : <p className='list_text'>Deleted Mails</p> }
                </li>
                <li className= {'SideBar_List ' + (mode == "star" ? 'List-Selected ' : '')} onClick={()=> setSelectedSubscription_Wrapper('star')}>
                    <StarTwoToneIcon/>  
                    {inMobile ? null : <p className='list_text'>Starred Mails</p> }
                </li>
                {
                    inMobile ? (<li className='SideBar_List ' ><MoreVertIcon/></li>) : (null)
                }
                {
                    inMobile ? (null) : subscriptionList.map((subscriber, index) => 
                    <li className={'SideBar_List ' + (mode == "list" && index == selectedSubscription ? 'List-Selected ' : '')} key={subscriber + "_sidebarlement"} onClick={()=> setSelectedSubscription_Wrapper('list', index)}> 
                        <InboxTwoToneIcon/> <p className='list_text'>{subscriber}</p>
                    </li>)
                }
            </ul>
        </div>
    </>)

}

export default memo(SideBar)