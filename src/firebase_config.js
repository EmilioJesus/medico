import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/storage";

firebase.initializeApp({
   apiKey: "AIzaSyByseb6tnouWmpGYySd7LTwl89lgBXBYjk",
   authDomain: "mimedicofamiliar-a1ea9.firebaseapp.com",
   projectId: "mimedicofamiliar-a1ea9",
   storageBucket: "mimedicofamiliar-a1ea9.appspot.com",
   messagingSenderId: "395979911307",
   appId: "1:395979911307:web:ceba6f15eeafa8e00a648e",
   measurementId: "G-71B9XLHPS2",
});
let db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
