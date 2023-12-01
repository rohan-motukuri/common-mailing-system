import { Avatar } from '@mui/material'

import "../../CSS/Navbar.css"

function Navbar({ subscriber, setSubscriber, inMobile, subscriberConstructor, setSearchQuery }) {
    console.log("Dev-Status: Rendering Navbar");

    const tempLogOut = () => {
        setSubscriber(subscriberConstructor(false));
        localStorage.removeItem('subscriberID');
    }

    const handleQueryType = (e) => {
        if(!e.target.value)
            setSearchQuery("");
        setSearchQuery(e.target.value);
    }

    return (<>
        {inMobile ? null : (<div className='NavBar_Logo'>
            <img src={""} alt = "Logo"/>
        </div>)}
        <div className='NavBar_Main'>
            <div className='NavBar_Search_Space' >
                <div className='NavBar_Searcher'>
                    <div className='NavBar_Searcher_Input'>
                        <input id="globalSearchBar" type="text"
                                onChange={handleQueryType}
                                autoComplete="off"/>
                    </div>
                </div>
            </div>
            <div className='NavBar_Profile' onClick={tempLogOut}>
                <Avatar src={subscriber.profile_pic} sx={{ width: "40px", height: "40px", bgcolor: "pink"}}/>
            </div>
        </div>
    </>)
}

export default Navbar
