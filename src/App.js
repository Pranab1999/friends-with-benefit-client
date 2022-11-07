import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Components
import Activate from "./components/Activate";
import Account from "./components/Account";
import Login from "./components/Login";
import Update from "./components/Update";
import UpdateEmail from "./components/UpdateEmail";
import UpdatePassword from "./components/UpdatePassword";


function App() {
  return (
    <div className="App">
        <div className='container my-4'>
          <ul className="header flex flex-row justify-center">
            <li className='nav-buttons'><a href="/about">About</a></li>
            <li className='nav-buttons'><a href="/benefits">Benefits</a></li>
            <li className='nav-buttons'><a href="/activate-key">Activate your key tag</a></li>
            <li className='nav-buttons'><a href="/">My Account</a></li>
            <li className='nav-buttons'><a href="/where">Where to get a key tag</a></li>
            <li className='nav-buttons'><a href="/contact">Be a sponsor</a></li>
          </ul>
        </div>
        <Router>
            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route exact path='/account' element={<Account />} />
                <Route exact path='/update' element={<Update />} />
                <Route exact path='/activate-key' element={<Activate />} />
                <Route exact path='/update-email' element={<UpdateEmail />} />
                <Route exact path='/update-password' element={<UpdatePassword />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
