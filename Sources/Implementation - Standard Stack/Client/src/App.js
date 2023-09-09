import { useState, useEffect } from "react";
import { auth, provider } from "./Components/Firebase"
import Axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [subscriberStatusChecked, setSubscriberStatusChecked] = useState(false);

  const getSubscriberStatus = () => {
    Axios.get("http://localhost:5000/UserCheck")
      .then((response) => {
        console.log(response);
        alert("Hiii, Just did this");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubscriberStatusChecked(true);
      });
  };

  // Check the user status only once when the component mounts
  useEffect(() => {
    if (!subscriberStatusChecked) {
      getSubscriberStatus();
    }
  }, [subscriberStatusChecked]);

  return (
    <>
      {user ? <div>SignIn</div> : null}
      {/* Render other content based on user state */}
    </>
  );
};


export default App;
