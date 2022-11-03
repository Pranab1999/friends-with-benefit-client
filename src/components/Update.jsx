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
  const ageGroup = [
    { label: "Under 10", value: "under 10" },
    { label: "10-17", value: "10-17" },
    { label: "18-24", value: "18-24" },
    { label: "25-39", value: "25-39" },
    { label: "40-54", value: "40-54" },
    { label: "55+", value: "55+" },
  ];

  const listenGroup = [
    "107.7 Devonport",
    "101.7 Burnie",
    "On the Website",
    "On the phone app",
    "At work",
    "At the gym",
    "In the car",
    "On weekdays",
    "On weekends",
    "During the day",
    "At night",
  ];

  // details to update
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
  const [groupCheckState, setGroupCheckState] = useState(
    new Array(listenGroup.length).fill(false)
  );

  const [user, loading, error] = useAuthState(auth);

  const fetchUserData = async () => {
    try {
      const q = query(
        collection(db, "fwb_entries"),
        where("uid", "==", user?.uid)
      );
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

  const updateUserData = async (
    firstName,
    lastName,
    phone,
    street,
    suburb,
    postcode,
    gender,
    age,
    listen,
    newsletter,
    offers
  ) => {
    try {
      const q = query(
        collection(db, "fwb_entries"),
        where("uid", "==", user?.uid)
      );
      const res = await getDocs(q);
      res.forEach((user) => {
        const getUser = doc(db, "fwb_entries", user.id);
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
          advertisers_offers: offers,
        });
      });
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating user data");
    }

    return (window.location.href = "/account");
  };

  const processListenGroupState = () => {
    let checklist = [];

    listenGroup.forEach((item) => {
      if (listen.includes(item)) {
        checklist.push(true);
      } else {
        checklist.push(false);
      }
    });

    setGroupCheckState(checklist);
  };

  const onChangeAgeGroup = (event) => {
    setAge(event.target.value);
  };

  const onChangeGender = (event) => {
    setGender(event.target.value);
  };

  const onListenGroupChange = (position) => {
    const updatedCheckedState = groupCheckState.map((item, index) =>
      index === position ? !item : item
    );

    let newListenGroup = [];

    setGroupCheckState(updatedCheckedState);

    updatedCheckedState.forEach((currentState, index) => {
      if (currentState === true) {
        newListenGroup.push(listenGroup[index]);
      }
    });

    setListen(newListenGroup);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return (window.location.href = "/");
    fetchUserData();
    processListenGroupState();
  }, [user, loading]);

  return (
    <div className='container edit'>
      <div className='wrapper flex flex-col space-y-2 text-left'>
        <div className='page_title text-2xl font-bold'>
          <h2>Edit Your Details</h2>
        </div>
        <div className='edit_fields space-y-2'>
          <div className='edit edit_first_name'>
            <label>First Name</label>
            <input
              type='text'
              name='first_name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='edit edit_last_name'>
            <label>Last Name </label>
            <input
              type='text'
              name={"last_name"}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='edit edit_phone'>
            <label>Last Name</label>
            <input
              type='text'
              name={"last_name"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='edit edit_street'>
            <label>Street Address</label>
            <input
              type='text'
              name='street'
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className='edit edit_suburb'>
            <label>Town/Suburb</label>
            <input
              type='text'
              name={"suburb"}
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
            />
          </div>
          <div className='edit edit_postcode'>
            <label>Postcode</label>
            <input
              type='text'
              name={"postcode"}
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>
          <div className='edit edit_gender'>
            <label>Gender</label>
            <input
              type='radio'
              value='Male'
              name='gender'
              onChange={onChangeGender}
              checked={gender === "Male"}
            />{" "}
            Male
            <input
              type='radio'
              value='Female'
              name='gender'
              onChange={onChangeGender}
              checked={gender === "Female"}
            />{" "}
            Female
          </div>
          <div className='edit edit_age'>
            <label>Age Group</label>
            <ul>
              {ageGroup.map((object, i) => {
                return (
                  <li key={i}>
                    <input
                      type='radio'
                      value={object.value}
                      name='age'
                      onChange={onChangeAgeGroup}
                      checked={age === object.value}
                    />
                    {object.label}
                    <br />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='edit edit_listen'>
            <label>How do you listen to Sea FM?</label>
            <ul>
              {listenGroup.map((name, index) => {
                return (
                  <li key={index}>
                    <input
                      type='checkbox'
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={groupCheckState[index]}
                      onChange={() => onListenGroupChange(index)}
                    />
                    <label
                      className='checkbox_label'
                      htmlFor={`custom-checkbox-${index}`}
                    >
                      {name}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='edit edit_newsletter'>
            <input
              type='checkbox'
              className='register_newsletter'
              checked={newsletterSubscription}
              onChange={() =>
                setNewsletterSubscription(!newsletterSubscription)
              }
            />
            <label className='checkbox_label'>
              Yes, I'd like to receive special offers from select Sea FM
              advertisers (we won't bombard you)
            </label>
          </div>
          <div className='edit edit_offers'>
            <input
              type='checkbox'
              className='register_offers'
              checked={offers}
              onChange={() => setOffers(!offers)}
            />
            <label className='checkbox_label'>
              Yes, sign me up to the Sea FM Friends With Benefits newsletter to
              be first to hear about benefits!
            </label>
          </div>
        </div>
        <div className='page_options flex flex-row space-x-1'>
          <button
            className='update_btn login_btn button text-white border-2 bg-btn-green px-3 py-2 last:rounded '
            onClick={() =>
              updateUserData(
                firstName,
                lastName,
                phone,
                street,
                suburb,
                postcode,
                gender,
                age,
                listen,
                newsletterSubscription,
                offers
              )
            }
          >
            Save Details
          </button>
          <button
            className='update_btn login_btn button text-white border-2 bg-btn-red px-3 py-2 last:rounded '
            onClick={() => (window.location.href = "/account")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
