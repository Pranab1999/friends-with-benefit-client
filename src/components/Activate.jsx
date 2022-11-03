import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, registerWithEmailAndPassword, db} from "../utils/firebase.js";

// Styles
import "./Activate.scss";

// Partials

const Activate = () => {

    const ageGroup = [
        {label: 'Under 10', value: 'under 10'},
        {label: '10-17', value: '10-17'},
        {label: '18-24', value: '18-24'},
        {label: '25-39', value: '25-39'},
        {label: '40-54', value: '40-54'},
        {label: '55+', value: '55+'},
    ];

    const listenGroup = [
        '107.7 Devonport',
        '101.7 Burnie',
        'On the Website',
        'On the phone app',
        'At work',
        'At the gym',
        'In the car',
        'On weekdays',
        'On weekends',
        'During the day',
        'At night'
    ];

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
    const [groupCheckState, setGroupCheckState] = useState(new Array(listenGroup.length).fill(false));
    const [listen, setListen] = useState([]);
    const [tagSource, setTagSource] = useState("");
    const [moreMusic, setMoreMusic] = useState("");
    const [newsletterSubscription, setNewsletterSubscription] = useState(false);
    const [offers, setOffers] = useState(false);
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);


    // const navigate = useNavigate();

    const register = () => {
        registerWithEmailAndPassword(
            tag,
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
            password
        ).then(r => console.log(r)).catch(err => console.log(err));
    };


    useEffect(() => {
        if (loading) return;
        if (user) console.log(user);
    }, [user, loading]);

    const onChangeGender = (event) => {
        setGender(event.target.value);
    }

    const onChangeAgeGroup = (event) => {
        setAge(event.target.value);
    }

    const onListenGroupChange = (position) => {
        const updatedCheckedState = groupCheckState.map((item, index) =>
            index === position ? !item : item
        );

        let newListenGroup = [];

        setGroupCheckState(updatedCheckedState);

        updatedCheckedState.forEach(
            ( currentState, index) => {
                if (currentState === true) {
                     newListenGroup.push(listenGroup[index]);
                }
            }
        );

        setListen(newListenGroup);
    };

    return (
        <div className='container register'>
            <div className="wrapper flex flex-col space-y-2 text-left">
                <div className="page_title text-2xl font-bold">
                    <h2>Activate your Key Tag</h2>
                </div>
                <div className='register_container space-y-2'>
                    <div className='field'>
                        <label>Enter your five-digit key tag number</label>
                        <input type='text'
                               className='input_field register_tag'
                               value={tag}
                               onChange={e => setTag(e.target.value)}
                               placeholder={'Tag'}
                        />
                    </div>
                    <div className='field'>
                        <label>First Name</label>
                        <input type='text'
                               className='input_field register_firstname'
                               value={firstName}
                               onChange={e => setFirstName(e.target.value)}
                               placeholder={'First Name'}
                        />
                    </div>
                    <div className='field'>
                        <label>Last Name</label>
                        <input type='text'
                               className='input_field register_lastname'
                               value={lastName}
                               onChange={e => setLastName(e.target.value)}
                               placeholder={'Last Name'}
                        />
                    </div>
                    <div className='field'>
                        <label>Phone</label>
                        <input type='text'
                               className='input_field register_phone'
                               value={phone}
                               onChange={e => setPhone(e.target.value)}
                               placeholder={'Phone'}
                        />
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type='text'
                               className='input_field register_email'
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                               placeholder={'Email'}
                        />
                    </div>
                    <div className='field'>
                        <label>Street Address</label>
                        <input type='text'
                               className='input_field register_street'
                               value={street}
                               onChange={e => setStreet(e.target.value)}
                               placeholder={'Street'}
                        />
                    </div>
                    <div className='field'>
                        <label>Town/Suburb</label>
                        <input type='text'
                               className='input_field register_suburb'
                               value={suburb}
                               onChange={e => setSuburb(e.target.value)}
                               placeholder={'Town/Suburb'}
                        />
                    </div>
                    <div className='field'>
                        <label>Postcode</label>
                        <input type='text'
                               className='input_field register_postcode'
                               value={postcode}
                               onChange={e => setPostcode(e.target.value)}
                               placeholder={'Postcode'}
                        />
                    </div>
                    <div className='field gender' onChange={onChangeGender}>
                        <label>Gender</label>
                        <input type="radio" value="Male" name="gender" checked={gender === "Male"} /> Male
                        <input type="radio" value="Female" name="gender" checked={gender === "Female"}/> Female
                    </div>
                    <div className='field age'onChange={onChangeAgeGroup}>
                        <label>Age Group</label>
                        <ul>
                            {ageGroup.map((object, i) =>
                                <li key={i}>
                                    <input type="radio" value={object.value} name="age" checked={age === object.value} />{object.label}
                                    <br />
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className='field listen'>
                        <label>How do you listen to Sea FM? (tick as many as you wish)</label>
                        <ul>
                            {listenGroup.map(( name , index) => {
                                return (
                                    <li key={index}>
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={name}
                                            value={name}
                                            checked={groupCheckState[index]}
                                            onChange={() => onListenGroupChange(index)}
                                        />
                                        <label className="checkbox" htmlFor={`custom-checkbox-${index}`}>{name}</label>       
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className='field'>
                        <label>Where did you get your Sea FM key tag from?</label>
                        <input type='text'
                               className='input_field register_source'
                               value={tagSource}
                               onChange={e => setTagSource(e.target.value)}
                               placeholder={''}
                        />
                    </div>
                    <div className='field'>
                        <label>What music would you like hear more of?</label>
                        <textarea
                               className='input_field register_more_music'
                               value={moreMusic}
                               onChange={e => setMoreMusic(e.target.value)}
                               placeholder={''}
                        />
                    </div>
                    <div className='field newsletter'>
                        <input type='checkbox'
                               name='newsletter'
                               className='input_field register_newsletter'
                               defaultChecked={newsletterSubscription}
                               onChange={() => setNewsletterSubscription(!newsletterSubscription)}
                        />
                        <label htmlFor="newsletter" className="checkbox">Yes, sign me up to the Sea FM Friends With Benefits newsletter to be first to hear about benefits!</label>

                    </div>
                    <div className='field offers'>
                        <input type='checkbox'
                               name='offers'
                               className='input_field register_offers'
                               defaultChecked={offers}
                               onChange={() => setOffers(!offers)}
                        />
                        <label htmlFor="offers" className="checkbox">Yes, I'd like to receive special offers from select Sea FM advertisers (we won't bombard you)</label>
                    </div>
                    <div className='field'>
                        <label>Password</label>
                        <input type='text'
                               className='input_field register_password'
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                               placeholder={'Password'}
                        />
                    </div>
                </div>
                <div className="page_options flex flex-row space-x-1">
                    <button className='register_btn login_btn button text-white border-2 bg-btn-green px-3 py-2 last:rounded ' onClick={register}>
                        Activate Now!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Activate;
