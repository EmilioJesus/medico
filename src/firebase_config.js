import firebase from  'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/storage';

firebase.initializeApp({
    apiKey: "AIzaSyAIfR5_3Yl7OvnEfMt-ENBmMBw2RCM27xY",
    authDomain: "medico1-dd480.firebaseapp.com",
    databaseURL: "https://medico1-dd480-default-rtdb.firebaseio.com",
    projectId: "medico1-dd480",
    storageBucket: "gs://medico1-dd480.appspot.com",
    messagingSenderId: "431337008311",
    appId: "1:431337008311:web:418f072c020dbf9b6e3132",
    measurementId: "G-71B9XLHPS2"
  });
  let db = firebase.firestore();
  db.settings({timestampsInSnapshots:true});
  
  export default db ;
  