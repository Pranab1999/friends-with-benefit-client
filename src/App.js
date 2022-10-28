import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Components
import Activate from "./components/Activate";
import Account from "./components/Account";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route exact path='/' element={<Account />} />
                <Route exact path='/activate-key' element={<Activate />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
