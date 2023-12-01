import Navbar from '../Navbar'
import Active_Display from '../Active_Display'
import { useState } from 'react';


function Home({ subscriber, setSubscriber, inMobile, subscriberConstructor, setIsOffline }) {
    console.log("Dev-Status: Rendering Home");

    const [searchQuery, setSearchQuery] = useState("");
    const [inSearchMode, setInSearchMode] = useState();
    
    return (<>
        <Navbar subscriber={subscriber} setSubscriber={setSubscriber} inMobile={inMobile} subscriberConstructor={subscriberConstructor} setSearchQuery={setSearchQuery} inSearchMode={inSearchMode} setInSearchMode={setInSearchMode}/>
        <Active_Display subscriber={subscriber} inMobile ={inMobile} searchQuery={searchQuery} inSearchMode={inSearchMode} setInSearchMode={setInSearchMode} setIsOffline={setIsOffline}/>
    </>)
}

export default Home