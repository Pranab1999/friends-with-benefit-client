import React, {useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../utils/firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

const UpdatePassword = () => {
    // check user auth status
    const [user, loading, error] = useAuthState(auth);

    const fetchUserPasswordData = async () => {

        try {
            const q = query(collection(db, "fwb_entries"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            // set the initial state for data fetched

        } catch (err) {
            console.error(err);
            alert("An error occurred while fetching user data");
        }

    };

    useEffect(() => {
        if (loading) return;
        if (!user) return window.location.href = "/";
        fetchUserPasswordData();
    }, [user, loading]);
}

export default UpdatePassword;