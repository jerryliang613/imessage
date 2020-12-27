// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbtEqwjJpm4AN_8UG9Zzt-8obwQsHlnM8",
    authDomain: "imessage-9f410.firebaseapp.com",
    databaseURL: "https://imessage-9f410-default-rtdb.firebaseio.com",
    projectId: "imessage-9f410",
    storageBucket: "imessage-9f410.appspot.com",
    messagingSenderId: "689816575830",
    appId: "1:689816575830:web:fa16a9027eeaea21d440f7",
    measurementId: "G-DW3K33TTES"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;