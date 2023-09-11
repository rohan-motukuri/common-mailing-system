import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

import SideBar from '../SideBar'
import Navbar from '../Navbar'

function Home({ subscriber, setSubscriber }) {

    return (<>
        <Navbar subscriber={subscriber} setSubscriber={setSubscriber}/>
        <SideBar subscriber={subscriber}/>  ListingPage Inside
    </>)
}

export default Home