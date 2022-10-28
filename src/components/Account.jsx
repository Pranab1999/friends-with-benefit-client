import React, { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword } from "../utils/firebase.js";
// import { useAuthState } from "react-firebase-hooks/auth";
import "./Account.scss";

const Account = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [user, loading, error] = useAuthState(auth);

    // const navigate = useNavigate();


    // useEffect(() => {
    //     if (loading) {
    //         // maybe trigger a loading screen
    //         return;
    //     }
    //     if (user) window.location.href = "/dashboard";
    //
    // }, [user, loading]);

    return (
        <div className='login'>
            <div className='login_container'>
                <p>
                    You must be logged in to view this page. Please login using the form
                    below, or <a href='/register'>join now.</a>
                </p>
                <div className='login_field'>
                    <div className='field'>
                        <label>Email Address</label>
                        <input
                            type='text'
                            className='login_textBox'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=''
                        />
                    </div>

                    <div className='field'>
                        <label>Password</label>
                        <input
                            type='password'
                            className='login_textBox'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=''
                        />
                    </div>

                    <button
                        type="submit"
                        className='login_btn'
                        onClick={() => logInWithEmailAndPassword(email, password)}
                    >
                        Login
                    </button>
                    {/* <button className='login_btn login_google' onClick={signInWithGoogle}>
            Login with Google
          </button> */}
                    <div className="reset_link">
                        <a href='/reset'>Lost your password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
