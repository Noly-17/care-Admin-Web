import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const app = firebase.initializeApp({
   apiKey: "AIzaSyCgRkp_e2xLmnvhAUUW4oCXg3qm70XJUcE",
  authDomain: "care-32007.firebaseapp.com",
  databaseURL: "https://care-32007-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "care-32007",
  storageBucket: "care-32007.appspot.com",
  messagingSenderId: "78412221759",
  appId: "1:78412221759:web:f7ed6e4ad2ae03a1b3578a",
  measurementId: "G-J6030JPRXG"
});


export const auth = app.auth()
export const db = firebase.database()
export default app;