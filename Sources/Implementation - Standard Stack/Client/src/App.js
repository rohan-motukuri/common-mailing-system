import { useState } from "react";
import React from "react";

import Home from "./Components/Home";
const SignIn = React.lazy(() => import("./Components/SignIn"));
// const Home = React.lazy(() => import("./Components/Home"));

function App () {
  console.log("Rendering App");

  const subscriberConstructor = (initiated = false, address = "", profile_pic = "") => {
    return {
      address : address,
      profile_pic : profile_pic,
      initiated : initiated
    }
  }

  const [subscriber, setSubscriber] = useState(subscriberConstructor());
  const [inMobile, setInMobile] = useState(false);

  return (
    <>
      {!subscriber.initiated ? (
        <React.Suspense fallback={<p>Loading Page ...</p>}>
          <SignIn setSubscriber={setSubscriber} subscriberConstructor={subscriberConstructor}/>
        </React.Suspense>) 
        : 
        <Home subscriber={subscriber} setSubscriber={setSubscriber} inMobile={inMobile}/>
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