import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Components
import Activate from "./components/Activate";
import Account from "./components/Account";
import Login from "./components/Login";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route exact path='/account' element={<Account />} />
                <Route exact path='/update' element={<Update />} />
                <Route exact path='/activate-key' element={<Activate />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
