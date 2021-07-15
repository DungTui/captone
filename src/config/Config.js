import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDGMta4PJX7Ap_qYuLuMX4IO7YbuJ4WnBU",
  authDomain: "fir-order-4598d.firebaseapp.com",
  databaseURL: "https://fir-order-4598d-default-rtdb.firebaseio.com",
  projectId: "fir-order-4598d",
  storageBucket: "fir-order-4598d.appspot.com",
  messagingSenderId: "938343975361",
  appId: "1:938343975361:web:7902dfe8c4458520e98740",
  measurementId: "G-YGC3DB7KK1"
};

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  export {auth, db, storage} 