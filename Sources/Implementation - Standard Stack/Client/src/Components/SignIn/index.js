import "../../CSS/SignIn.css";

function SignIn ({ setSubscriber, subscriberConstructor }) {
    console.log("Dev-Status: Rendering SignIn");

    const handleLogin = (address) => {
        setSubscriber(subscriberConstructor(true, address))
        localStorage.setItem('subscriberID', address)
    }

    return(<>
        <div className='signin_background_card'>
            <div className='signin_logo'>
                <img src='' alt='Logo'/>
            </div>

            <div className='signin_enter'>
                <button className='button' onClick={()=>handleLogin("test@test.com")}>Enter In</button>
            </div>

            <div className='signin_login'>
                <p className='signin_login_text'>Alternatively, <a className='signin_login_link' onClick={()=>{console.log("Selected RThis")}}>login</a> to personalize</p>
            </div>
        </div>
    </>);
}

export default SignIn;