import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db, updateUserEmail} from "../utils/firebase";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";

const UpdateEmail = () => {

    // check user auth status
    const [user, loading, error] = useAuthState(auth);

    // set email state
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');


    const fetchUserEmailData = async () => {

        try {
            const q = query(collection(db, "fwb_entries"), where("uid", "==", user?.uid));
            setCurrentUserEmail(user.email)
            // set the initial state for data fetched

        } catch (err) {
            console.error(err);
            alert("An error occurred while fetching user data");
        }

    };

    // handle user email update on both database and user info
    const updateEmail = async (newEmail) => {
        try {
            const q = query(collection(db, "fwb_entries"), where("uid", "==", user?.uid));
            const res = await getDocs(q);
            res.forEach( (user) => {
                const getUser = doc(db, "fwb_entries", user.id);
                updateDoc(getUser, {
                    email: newEmail
                });
            });

            updateUserEmail(newEmail);

        } catch (err) {
            console.log(err);
        }
        return;
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return window.location.href = "/";
        fetchUserEmailData();
    }, [user, loading]);


    return (
      <div className={"container"}>
          <div className={"email_details"}>
              <div>
                  <label>
                      Current Email Address
                      <input className={"current_email"} value={currentUserEmail} readOnly/>
                  </label>
              </div>

              <div>
                  <label>
                      New Email Address
                      <input  type={'text'} className={"new_email"} value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)}/>
                  </label>
              </div>
          </div>
          <div>
              <button onClick={() => updateEmail(
                  newUserEmail
              )}>
                  Change
              </button>
          </div>
      </div>
    );
}

export default UpdateEmail;