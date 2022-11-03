import React, { useState, useEffect } from "react";
import {
  auth,
  logInWithEmailAndPassword,
  sendPasswordReset,
} from "../utils/firebase.js";
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
    <div className='container login'>
      <div className='login_container flex flex-col text-left space-y-2.5'>
        <div className='login_title'>
          <h2 className='text-2xl font-bold'>Login</h2>
        </div>
        <div className='login_description'>
          <p className='text-light'>
            Login to your account to manage your personal details, including
            email address.
            <br />
            Click on Lost Password if you want to set a new password.
          </p>
        </div>
        <div className='login_field'>
          <div className='field flex flex-col space-y-1.5'>
            <label className='text-sm font-bold'>
              Key Tag number or Email address
            </label>
            <input
              type='text'
              className='login_textBox form-input rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=''
            />
          </div>

          <div className='field flex flex-col'>
            <label className='text-sm font-bold'>Password</label>
            <input
              type='password'
              className='login_textBox form-input rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=''
            />
          </div>

          <div className='login_cta flex space-x-1.5 mt-4'>
            <button
              className='login_btn button text-white border-2 bg-btn-green p-1 rounded w-1/2'
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
            </button>

            <button
              className='reset_btn button text-white border-2 bg-btn-blue p-1 rounded w-1/2'
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
