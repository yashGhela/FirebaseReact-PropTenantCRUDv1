
import './App.css';
import "@fontsource/roboto";

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreateTenant from './pages/CreateTenant';
import Login from './pages/Login';
import { useState } from 'react';
import {signOut} from 'firebase/auth';
import{auth} from './firebaseConfig';
import Doc from './pages/Doc';
import Edit from './pages/Edit';


function App() {

  const[isAuth, setIsAuth] = useState(localStorage.getItem('isAuth')); //checks if a user is logged in or not

  const LogOut =()=>{ //log out
    signOut(auth).then(()=>{
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname= '/login';
    })

  }
  return ( // Routes and Router
    <Router>

      <nav>
      {!isAuth?(<Link to='/login'>Login</Link>):
      <>
      <Link to='/'>Home</Link>
      <button className='LogOut' onClick={LogOut}>Log Out</button>
      
      </>
      }
      
      </nav>
      <Routes> 
        <Route path='/' element={<Home isAuth={isAuth}/>}/>
        <Route path='/createTenant' element={<CreateTenant isAuth={isAuth}/>}/>
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path='/doc' element={<Doc isAuth={isAuth}/>}/>
        <Route path='/edit' element={<Edit/>}/>
      </Routes>
    </Router>
  );
}

export default App;
