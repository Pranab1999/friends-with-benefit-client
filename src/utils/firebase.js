import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// firebase auth services
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut,} from 'firebase/auth';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "friends-with-benefit-ed2fd.firebaseapp.com",
    projectId: "friends-with-benefit-ed2fd",
    storageBucket: "friends-with-benefit-ed2fd.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId:process.env.REACT_APP_API_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const firestoreDB = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);


// login with user and password
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// register with email and password
const registerWithEmailAndPassword = async (firstName, lastName, fullName, email, phone, password, region, location, group, dob, subscription) => {

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// incase of password needed
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!');
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// logout
const logout = () => {
    signOut(auth);
};


// global functions
export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};
