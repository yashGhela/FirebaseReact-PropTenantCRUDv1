import React from 'react';
import {auth, provider} from '../firebaseConfig';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom'

function Login({setIsAuth}) {
  let nav = useNavigate();

  const signIn =()=>{
    signInWithPopup(auth, provider).then((result)=>{
      localStorage.setItem('isAuth' , true);
      setIsAuth(true);
      nav('/');
    })

  }
  return (
    <div className='LoginCont'>
      <h2>Login using Google</h2>
      <button className='GoogleButton' onClick={signIn}>Sign in With Google</button>
    </div>
  )
}

export default Login