import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

// const firebaseConfig = {
//     apiKey:     process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAXqte3hBo9HmfjHuxcZ7Cghjr2CTdu8Ic",
  authDomain: "letmeask-d10d5.firebaseapp.com",
  databaseURL: "https://letmeask-d10d5-default-rtdb.firebaseio.com",
  projectId: "letmeask-d10d5",
  storageBucket: "letmeask-d10d5.appspot.com",
  messagingSenderId: "5234947994",
  appId: "1:5234947994:web:88038d4a0e880b013cec23"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };