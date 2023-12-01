import { useState } from "react";
import React from "react";

import Home from "./Components/Home";
import ErrorPage from "./Components/ErrorPage";
const SignIn = React.lazy(() => import("./Components/SignIn"));

// const Home = React.lazy(() => import("./Components/Home"));

const checkForPreviousLogin = () => {
  if(localStorage.getItem('subscriberID') != null) {
    return subscriberConstructor(true, localStorage.getItem('subscriberID'));
  }
  return subscriberConstructor();
} 

const subscriberConstructor = (initiated = false, address = "", profile_pic = "") => {
  return {
    address : address,
    profile_pic : profile_pic,
    initiated : initiated
  }
}

function App () {
  console.log("Dev-Status: Rendering App");
  
  const [subscriber, setSubscriber] = useState(checkForPreviousLogin);
  const [isOffline, setIsOffline] = useState(false);

  return (
    <>
      {
        !subscriber.initiated ? (
        <React.Suspense fallback={<p>Loading Page ...</p>}>
          <SignIn setSubscriber={setSubscriber} subscriberConstructor={subscriberConstructor}/>
        </React.Suspense>) 
        : 
        <Home subscriber={subscriber} setSubscriber={setSubscriber} subscriberConstructor={subscriberConstructor} setIsOffline={setIsOffline}/>
      }
    </>
  );
};

export default App;
  // const getSubscriberStatus = () => {
  //   Axios.get("http://localhost:5000/subscriberCheck:rohan@gmail.com")
  //     .then((response) => {
  //       console.log(response);
  //       alert("The response was : " + response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setSubscriberStatusChecked(true);
  //     });
  // };

  // // Check the subscriber status only once when the component mounts
  // useEffect(() => {
  //   if (!subscriberStatusChecked) {
  //     getSubscriberStatus();
  //   }
  // }, [subscriberStatusChecked]);