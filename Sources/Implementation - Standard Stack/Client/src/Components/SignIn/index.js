import "../../CSS/SignIn.css";

function SignIn ({ setSubscriber, subscriberConstructor }) {
    console.log("Rendering SignIn");
    return(<>
        <div className='signin_background_card'>
            <div className='signin_logo'>
                <img src='' alt='Logo'/>
            </div>

            <div className='signin_enter'>
                <button className='button' onClick={()=>setSubscriber(subscriberConstructor(true, "test@test.com"))}>Enter In</button>
            </div>

            <div className='signin_login'>
                <p className='signin_login_text'>Alternatively, <a className='signin_login_link' onClick={()=>{console.log("Selected RThis")}}>login</a> to personalize</p>
            </div>
        </div>
    </>);
}

export default SignIn;