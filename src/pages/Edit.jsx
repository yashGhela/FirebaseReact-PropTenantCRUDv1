import React from 'react'
import { useLocation } from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../firebaseConfig';

function Edit() {

  

    const location = useLocation();
   
    
  
  return (
    <div className='EditCont'>
        <h2></h2>
    </div>
  )
}

export default Edit