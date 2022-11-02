import React, {useState, useEffect} from "react";
import { auth, logInWithEmailAndPassword, sendPasswordReset} from "../utils/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);


    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) window.location.href = "/account";

    }, [user, loading]);

    return (
        <div className='login'>
            <div className='login_container'>
                <div className={'login_title'}>
                    <h2 className={'text-3xl font-bold underline'}>Login</h2>
                </div>
                <div className={'login_description'}>
                    <p>
                        Login to your account to manage your personal details, including email address.

                        Click on Lost Password if you want to set a new password.

                    </p>
                </div>
                <div className='login_field'>
                    <div className='field'>
                        <label>Key Tag number or Email address</label>
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

                    <div className={'login_cta'}>
                        <button
                            className='login_btn'
                            onClick={() => logInWithEmailAndPassword(email, password)}
                        >
                            Login
                        </button>

                        <button
                            className='reset_btn'
                            onClick={() => sendPasswordReset(email)}
                        >
                            Lost Password?
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;