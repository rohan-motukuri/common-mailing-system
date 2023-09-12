import React from 'react'

import Navbar from '../Navbar'
import Display from '../Display'


function Home({ subscriber, setSubscriber, inMobile }) {
    console.log("Rendering Home");

    return (<>
        <Navbar subscriber={subscriber} setSubscriber={setSubscriber}/>
        <Display subscriber={subscriber} inMobile = {inMobile}/>
    </>)
}

export default Home