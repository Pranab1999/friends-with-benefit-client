import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, updateUserEmail } from "../utils/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const UpdateEmail = () => {
  // check user auth status
  const [user, loading, error] = useAuthState(auth);

  // set email state
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const fetchUserEmailData = async () => {
    try {
      const q = query(
        collection(db, "fwb_entries"),
        where("uid", "==", user?.uid)
      );
      setCurrentUserEmail(user.email);
      // set the initial state for data fetched
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  // handle user email update on both database and user info
  const updateEmail = async (newEmail) => {
    try {
      const q = query(
        collection(db, "fwb_entries"),
        where("uid", "==", user?.uid)
      );
      const res = await getDocs(q);
      res.forEach((user) => {
        const getUser = doc(db, "fwb_entries", user.id);
        updateDoc(getUser, {
          email: newEmail,
        });
      });

      updateUserEmail(newEmail);
    } catch (err) {
      console.log(err);
    }
    return;
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return (window.location.href = "/");
    fetchUserEmailData();
  }, [user, loading]);

  return (
    <div className='container'>
      <div className='wrapper flex flex-col space-y-2 text-left'>
        <div className='page_title text-2xl font-bold'>
          <h3>Change Email Address</h3>
        </div>
        <div className='email_details'>
          <div className='edit'>
            <label>Current email address</label>
            <input
              type='text'
              className='current_email'
              value={currentUserEmail}
              readOnly
            />
          </div>

          <div className='edit'>
            <label>Email address to change to</label>
            <input
              type='text'
              className='new_email'
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
          </div>
        </div>
        <div className='page_options flex flex-row space-x-1'>
          <button
            className='update_btn login_btn button text-white border-2 bg-btn-green px-3 py-2 last:rounded '
            onClick={() => updateEmail(newUserEmail)}
          >
            Submit
          </button>
          <button
            className='cacnel_btn login_btn button text-white border-2 bg-btn-red px-3 py-2 last:rounded '
            onClick={() => (window.location.href = "/account")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmail;
