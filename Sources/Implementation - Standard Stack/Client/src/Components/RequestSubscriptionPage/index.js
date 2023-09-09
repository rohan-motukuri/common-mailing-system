import React from 'react'

const index = () => {
    
    
    return (<>
        <div className='AuthPage'>
            <img src='' alt='Access not Authorized'/>
            <span className='Message'>Sorry, we can't find you in our records</span>
            <br/>
            <span className='Suggestion'>Log in with your college given mail, In case you can't access it or would prefer to view common mail from the current account, Hit the 'Request Access' button below</span>
            <input inputMode='text'>Request Access</input> // "Request Subscription" in case of scalable version
        </div>
        
    </>);
}

export default index;