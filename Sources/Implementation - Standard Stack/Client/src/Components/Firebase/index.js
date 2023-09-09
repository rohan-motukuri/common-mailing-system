import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API,
  authDomain: "common-mailing-system.firebaseapp.com",
  databaseURL: "https://common-mailing-system-default-rtdb.firebaseio.com",
  projectId: "common-mailing-system",
  storageBucket: "common-mailing-system.appspot.com",
  messagingSenderId: "173006644065",
  appId: "1:173006644065:web:3d6fe78f1c6272c1509b20"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider};
