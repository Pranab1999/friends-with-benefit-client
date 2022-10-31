import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, sendPasswordReset } from "../utils/firebase";
import {
    query,
    collection,
    getDocs,
    where,
    updateDoc,
    doc,
} from "firebase/firestore";

// Styles
import "./Update.scss";

const Update = () => {

    // details tp update
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [suburb, setSuburb] = useState("");
    const [postcode, setPostcode] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [listen, setListen] = useState([]);
    const [newsletterSubscription, setNewsletterSubscription] = useState(false);
    const [offers, setOffers] = useState(false);

    const [user, loading, error] = useAuthState(auth);

    const fetchUserData = async () => {
        try {
            const q = query(collection(db, "fwb_entries"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();

            // set the initial state for data fetched
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setPhone(data.phone);
            setStreet(data.address);
            setSuburb(data.suburb);
            setPostcode(data.post_code);
            setGender(data.gender);
            setAge(data.age);
            setListen(data.listen);
            setNewsletterSubscription(data.newsletter);
            setOffers(data.advertisers_offers);

        } catch (err) {
            console.error(err);
            alert("An error occurred while fetching user data");
        }
    };

    const updateUserData = async (firstName, lastName, phone, street, suburb, postcode, gender, age, listen, newsletter, offers) => {
        try {
            const q = query(collection(db, "fwb_entries"), where("uid", "==", user?.uid));
            const res = await getDocs(q);
            console.log(res);
            res.forEach( (user) => {
                const getUser = doc(db, "users", user.id);
                 updateDoc(getUser, {
                     first_name: firstName,
                     last_name: lastName,
                     phone: phone,
                     address: street,
                     suburb: suburb,
                     post_code: postcode,
                     gender: gender,
                     age: age,
                     listen: listen,
                     newsletter: newsletterSubscription,
                     advertisers_offers: offers
                });
            });
        } catch (err) {
            console.error(err);
            alert("An error occurred while updating user data");
        }

        return window.location.href = "/";
    };


    useEffect(() => {
        if (loading) return;
        if (!user) return window.location.href = "/";
        fetchUserData();
    }, [user, loading]);

    return (
        <div className='edit'>
            <div className='edit_container'>

            </div>
        </div>
    );
};

export default Update;
