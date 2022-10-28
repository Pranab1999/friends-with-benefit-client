import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getFirestore , query, getDocs, collection, where,addDoc} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// firebase auth services
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut} from 'firebase/auth';


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
const db = getFirestore(app);
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
const registerWithEmailAndPassword = async (tag,
                                            firstName,
                                            lastName,
                                            phone,
                                            email,
                                            street,
                                            suburb,
                                            postcode,
                                            gender,
                                            age,
                                            listen,
                                            tagSource,
                                            moreMusic,
                                            newsletterSubscription,
                                            offers,
                                            password) => {

    try {

        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db, 'fwb_entries'), {
            uid: user.uid,
            authProvider: 'local',
            tag_number: parseInt(tag),
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            age: age,
            listen: listen,
            music_more: moreMusic,
            email: user.email,
            tag_origin: tagSource,
            gender: gender,
            address: street,
            suburb: suburb,
            post_code: postcode,
            newsletter: newsletterSubscription,
            advertisers_offers : offers,
        });

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
