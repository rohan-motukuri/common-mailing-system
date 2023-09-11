import { useState, useEffect } from "react";
import React from "react";

import Home from "./Components/Home";

const SignIn = React.lazy(() => import("./Components/SignIn"));
// const Home = React.lazy(() => import("./Components/Home"));

const App = () => {
  const [subscriber, setSubscriber] = useState(null);

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

  return (
    <>
      {!subscriber ? <React.Suspense fallback={<p>Loading Page ...</p>}>
        <SignIn setSubscriber={setSubscriber}/>
      </React.Suspense> : 
        <Home/>
      /*<React.Suspense fallback={<p>Loading Page ...</p>}>
        <Home/>
      </React.Suspense>*/}
    </>
  );
};


export default App;
