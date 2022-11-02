import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db, updateUserEmail, updateUserPassword} from "../utils/firebase";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";

const UpdatePassword = () => {
    // check user auth status
    const [user, loading, error] = useAuthState(auth);

    const [currentUserPass, setCurrentUserPass] = useState('');
    const [newUserPass, setNewUserPass] = useState('');

    const fetchUserPasswordData = async () => {

        try {
            const q = query(collection(db, "fwb_entries"), where("uid", "==", user?.uid));
        } catch (err) {
            console.error(err);
            alert("An error occurred while fetching user data");
        }

    };

    const updatePassword = async (newPassword) => {
        try {

            updateUserPassword(newPassword);

        } catch (err) {
            console.log(err);
        }
        return;
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return window.location.href = "/";
        fetchUserPasswordData();
    }, [user, loading]);


    return (
        <div className={"container"}>
            <div>
                <label>
                    New Password
                    <input type={'text'} value={newUserPass} onChange={e => setNewUserPass(e.target.value)}/>
                </label>
            </div>

            <button onClick={() => updatePassword(
                newUserPass
            )}>
                Update
            </button>
        </div>
    );
}

export default UpdatePassword;