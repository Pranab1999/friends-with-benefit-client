import { initializeApp } from "firebase/app";
import { getFirestore , collection ,addDoc} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// firebase auth services
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateEmail,
    updateProfile,
    updatePassword
} from 'firebase/auth';


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

        const docRef = await addDoc(collection(db, 'fwb_entries'), {
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

        console.log("Document written with ID: ", docRef.id);

    } catch (err) {
        console.error("Error adding document: ", err);
        alert(err.message);
    }
};

// in case of password needed
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!');
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// update profile
const updateUserProfile = (displayName, photoUrl) => {
    updateProfile(auth.currentUser, {
        displayName: displayName, photoURL: photoUrl
    }).then(() => {
        // Profile updated!
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });
}

// update user email
const updateUserEmail = (newEmail) => {

    updateEmail(auth.currentUser, newEmail).then(() => {
        // Email updated!
        window.alert("Email updated!")
        return true;
    }).catch((error) => {
        // An error occurred
        console.log(error)
        return false;
    });
}

// update user password
const updateUserPassword = (newPassword) => {

    updatePassword(auth.currentUser, newPassword).then(() => {
        // Update successful.
        window.alert("Password updated!")
        return true;
    }).catch((error) => {
        // An error occurred
        // ...
        console.log(error)
        return false;
    });
}

// logout
const logout = () => {
    signOut(auth).then(r => {
        // Success
    }).catch((err) => {
        console.log(err)
    });
};

// global functions
export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    updateUserEmail,
    updateUserPassword,
    updateUserProfile,
    logout,
};
