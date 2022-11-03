import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  db,
  updateUserEmail,
  updateUserPassword,
} from "../utils/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const UpdatePassword = () => {
  // check user auth status
  const [user, loading, error] = useAuthState(auth);

  const [currentUserPass, setCurrentUserPass] = useState("");
  const [newUserPass, setNewUserPass] = useState("");

  const fetchUserPasswordData = async () => {
    try {
      const q = query(
        collection(db, "fwb_entries"),
        where("uid", "==", user?.uid)
      );
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
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return (window.location.href = "/");
    fetchUserPasswordData();
  }, [user, loading]);

  return (
    <div className='container'>
      <div className='wrapper flex flex-col space-y-2 text-left'>
        <div className='page_title text-2xl font-bold'>
          <h3>Update Password</h3>
        </div>
        <div className='password_details'>
          <div className='edit'>
            <label>New Password</label>
            <input
              type='text'
              value={newUserPass}
              onChange={(e) => setNewUserPass(e.target.value)}
            />
          </div>
        </div>
        <div className='page_options flex flex-row space-x-1'>
          <button
            className='update_btn login_btn button text-white border-2 bg-btn-green px-3 py-2 last:rounded '
            onClick={() => updatePassword(newUserPass)}
          >
            Update Password
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

export default UpdatePassword;
