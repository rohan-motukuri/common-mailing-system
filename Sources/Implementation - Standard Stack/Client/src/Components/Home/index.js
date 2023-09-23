import Navbar from '../Navbar'
import Active_Display from '../Active_Display'


function Home({ subscriber, setSubscriber, inMobile, subscriberConstructor }) {
    console.log("Dev-Status: Rendering Home");
    
    return (<>
        <Navbar subscriber={subscriber} setSubscriber={setSubscriber} inMobile={inMobile} subscriberConstructor={subscriberConstructor}/>
        <Active_Display subscriber={subscriber} inMobile ={inMobile}/>
    </>)
}

export default Home