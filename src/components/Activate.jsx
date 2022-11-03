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
        <div className='container mx-auto register'>
            <div className='register_container'>
                <div>
                    <input type='text'
                           className='input_field register_tag'
                           value={tag}
                           onChange={e => setTag(e.target.value)}
                           placeholder={'Tag'}
                    />
                </div>
                <div>
                    <input type='text'
                           className='input_field register_firstname'
                           value={firstName}
                           onChange={e => setFirstName(e.target.value)}
                           placeholder={'First Name'}
                    />
                </div>
                <div>
                    <input type='text'
                           className='input_field register_lastname'
                           value={lastName}
                           onChange={e => setLastName(e.target.value)}
                           placeholder={'Last Name'}
                    />
                </div>
                <div>
                    <input type='text'
                           className='input_field register_phone'
                           value={phone}
                           onChange={e => setPhone(e.target.value)}
                           placeholder={'Phone'}
                    />
                </div>
                <div>
                    <input type='text'
                           className='input_field register_email'
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           placeholder={'Email'}
                    />
                </div>
                <div>
                    <input type='text'
                           className='input_field register_street'
                           value={street}
                           onChange={e => setStreet(e.target.value)}
                           placeholder={'Street'}
                    />
                </div>
                <div>
                    <input type='text'
                           className='input_field register_suburb'
                           value={suburb}
                           onChange={e => setSuburb(e.target.value)}
                           placeholder={'Town/Suburb'}
                    />
                </div>
                <div>
                    <input type='text'
                           className='input_field register_postcode'
                           value={postcode}
                           onChange={e => setPostcode(e.target.value)}
                           placeholder={'Postcode'}
                    />
                </div>
                <div onChange={onChangeGender}>
                    <input type="radio" value="Male" name="gender" checked={gender === "Male"} /> Male
                    <input type="radio" value="Female" name="gender" checked={gender === "Female"}/> Female
                </div>
                <div onChange={onChangeAgeGroup}>
                    {ageGroup.map((object, i) =>
                        <>
                            <input type="radio" value={object.value} name="age" checked={age === object.value} />{object.label}
                            <br />
                        </>
                    )}
                </div>
                <div className="">
                    {listenGroup.map(( name , index) => {
                        return (
                            <li key={index}>
                                <div className="">
                                    <div className="">
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={name}
                                            value={name}
                                            checked={groupCheckState[index]}
                                            onChange={() => onListenGroupChange(index)}
                                        />
                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </div>
                <div>
                    <input type='text'
                           className='input_field register_source'
                           value={tagSource}
                           onChange={e => setTagSource(e.target.value)}
                           placeholder={''}
                    />
                </div>
                <div>
                    <textarea
                           className='input_field register_more_music'
                           value={moreMusic}
                           onChange={e => setMoreMusic(e.target.value)}
                           placeholder={''}
                    />
                </div>
                <div>
                    <input type='checkbox'
                           className='input_field register_newsletter'
                           defaultChecked={newsletterSubscription}
                           onChange={() => setNewsletterSubscription(!newsletterSubscription)}
                    />
                </div>
                <div>
                    <input type='checkbox'
                           className='input_field register_offers'
                           defaultChecked={offers}
                           onChange={() => setOffers(!offers)}
                    />
                </div>
                <div>
                    <input type='text'
                           className='input_field register_password'
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           placeholder={'Password'}
                    />
                </div>
            </div>
            <button className='register_btn' onClick={register}>
                Register
            </button>
        </div>
    );
};

export default Activate;
