import React, { useEffect, useState } from "react";

// Firebase utils
import { auth, db, logout } from "../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


// Styles
import "./Account.scss";

const Account = () => {

    // set user data here
    const [tag, setTag] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [suburb, setSuburb] = useState("");
    const [postcode, setPostcode] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [listen, setListen] = useState([]);
    const [tagSource, setTagSource] = useState("");
    const [moreMusic, setMoreMusic] = useState("");
    const [newsletterSubscription, setNewsletterSubscription] = useState(false);
    const [offers, setOffers] = useState(false);

    // check user auth status
    const [user, loading, error] = useAuthState(auth);

    const fetchUserData = async () => {

        try {
            const q = query(collection(db, "fwb_entries"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            // set the initial state for data fetched
            setTag(data.tag_number)
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setPhone(data.phone);
            setEmail(data.email);
            setStreet(data.address);
            setSuburb(data.suburb);
            setPostcode(data.post_code);
            setGender(data.gender);
            setAge(data.age);
            setListen(data.listen);
            setTagSource(data.tag_origin);
            setMoreMusic(data.music_more);
            setNewsletterSubscription(data.newsletter);
            setOffers(data.advertisers_offers);
        } catch (err) {
            console.error(err);
            alert("An error occurred while fetching user data");
        }

    };

    useEffect(() => {
        if (loading) return;
        if (!user) return window.location.href = "/";
        fetchUserData();
    }, [user, loading]);

    const updateDetails = () => {
        return window.location.href = "/update";
    };

    const updateEmail = () => {
        return window.location.href = "/update-email";
    };

    const updatePassword = () => {
        return window.location.href = "/update-password";
    };

    return (
        <div className="container">
            <div className="wrapper flex flex-col space-y-2">
                <div className="page_title text-2xl font-bold text-left">
                    <h2>My Profile</h2>
                </div>
                <div className="page_options flex flex-row space-x-1">
                    <button
                        className='login_btn button hover:opacity-75 text-white border-2 bg-btn-green p-1 rounded w-1/4'
                        onClick={updateDetails}>
                        Update Details
                    </button>
                    <button
                        className='login_btn button hover:opacity-75 text-white border-2 bg-btn-blue p-1 rounded w-1/4'
                        onClick={updatePassword}>
                        Change Password
                    </button>
                    <button
                        className='login_btn button hover:opacity-75 text-white border-2 bg-btn-cyan p-1 rounded w-1/4'
                        onClick={updateEmail}>
                        Change Email Address
                    </button>
                    <button
                        className='login_btn button hover:opacity-75 text-white border-2 bg-btn-red p-1 rounded w-1/4'
                        onClick={logout}>
                        Log out
                    </button>
                </div>
                <div className="user_details_container">
                    <div className="inner_content">
                        <ul className="user_details text-left">
                            <li className="detail user_tag text-left">
                                <h5>Tag Number</h5>
                                <p>{tag}</p>
                            </li>
                            <li className="detail user_first_name">
                                <h5>First Name</h5>
                                <p>{firstName}</p>
                            </li>
                            <li className="detail user_last_name">
                                <h5>Last Name</h5>
                                <p>{lastName}</p>
                            </li>
                            <li className="detail user_phone">
                                <h5>Phone</h5>
                                <p>{phone}</p>
                            </li>
                            <li className="detail user_email">
                                <h5>Email</h5>
                                <p>{email}</p>
                            </li>
                            <li className="detail user_street">
                                <h5>Street Address</h5>
                                <p>{street}</p>
                            </li>
                            <li className="detail user_suburb">
                                <h5>Town/Suburb</h5>
                                <p>{suburb}</p>
                            </li>
                            <li className="detail user_post_code">
                                <h5>PostCode</h5>
                                <p>{postcode}</p>
                            </li>
                            <li className="detail user_gender">
                                <h5>Gender</h5>
                                <p>{gender}</p>
                            </li>
                            <li className="detail user_age">
                                <h5>Age</h5>
                                <p>{age}</p>
                            </li>
                            <li className="detail user_listen">
                                <h5>How do you listen to Sea FM?</h5>
                                <p>{listen.join(", ")}</p>
                            </li>
                            <li className="detail user_tag_origin">
                                <h5>Tag Origin</h5>
                                <p>{tagSource}</p>
                            </li>
                            <li className="detail user_more_music">
                                <h5>Music would you like hear more of</h5>
                                <p>{moreMusic}</p>
                            </li>
                            <li className="detail user_offers">
                                <h5>Receive special offers from select Sea FM advertisers</h5>
                                <p>{offers ? 'Yes' : 'No'}</p>
                            </li>
                            <li className="detail user_subscription">
                                <h5>Receive Sea FM Friends With Benefits newsletter</h5>
                                <p>{newsletterSubscription ? 'Yes' : 'No'}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Account;
