import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// Firebase utils
import { auth, db, logout } from "../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

// Styles
import "./Account.scss";

const Account = () => {

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
        if (!user) return window.location.href = "/";
    }, [user, loading]);

    return (
        <div>
            <h2>Here are your account details</h2>
            <button onClick={logout}>
                Log out
            </button>
        </div>
    );

};

export default Account;
