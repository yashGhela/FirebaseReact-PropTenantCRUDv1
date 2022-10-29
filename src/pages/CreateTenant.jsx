import React, { useEffect, useRef, useState } from 'react';
import {db, storage} from '../firebaseConfig'
import {collection, addDoc} from 'firebase/firestore'
import { async } from '@firebase/util';
import {useNavigate} from 'react-router-dom';
import {ref, uploadBytes} from 'firebase/storage';

function CreateTenant({isAuth}) {

  const [disabled, setDisabled] = useState(true);  //sets the add tenant button to enabled or disabled
  const firstRender = useRef(true);         // references the first render

  const [name, setName] = useState('');        // Sets all needed properties. name surname etc.
  const [surname,setSurname] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [Id, setId] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');
  const [imageUpload, setImageUpload] = useState(null);

  const [nameError, setNameError] = useState(null);        // catches errors. like when somebody doesnt enter a name or surname
  const [surnameError, setSurnameError] = useState(null);
  const [contactError, setContactError] = useState(null);
  const [addressError, setAddressError] = useState(null);

  const tenantCollectionRef = collection(db, 'tenants');      // collection reference
  let nav =useNavigate();           //navigation

  const addTenant = async()=>{    //adds a new doc with the tenant and all needed properties
    await addDoc(tenantCollectionRef, {
      Name: name,
      Surname: surname,
      Contact: contact,
      Address: address,
      Id: Id,
      Salary: salary,
      Date: date,
    });
    nav('/');

  }

  useEffect(()=>{    // checks to see if any values are nulled

    if (firstRender.current){
      firstRender.current= false;

    }
    setDisabled(formValidation());

  }, [name,surname,contact,address]);

  const formValidation = () =>{  //checks for errors
    if (name ===''){
      setNameError('Name cannot be blank');
      return true

    }
    if (surname ===''){
      setSurnameError('Surname cannot be blank');
      return true
    }
    if (contact===''){
      setContactError('Contact cannot be blank');
      return true
    }
    if (address ===''){
      setAddressError('Address cannot be blank');
      return true

    }
    else{
      setNameError(null);
      setSurnameError(null);
      setContactError(null);
      setAddressError(null);
      return false
    }
 
  }
 
  const uploadImage=()=>{  //uploads an image
    if (imageUpload== null) return;
    const imageRef = ref(storage, 'images/${imageUpload.name}');
    uploadBytes(imageRef,imageUpload).then(()=>{
      alert('image uploaded');
    })



  }



  return ( //ui and such
    <div className='CreateTenant'>  
      <h1>Add a Tenant</h1>
      <div className="form">
      <h3>Enter Name</h3>
        <input onChange={(e)=>{setName(e.target.value)}} required/>
        {nameError && <div className='error'>{nameError}</div>}
        <h3>Enter Surname</h3>
        <input onChange={(e)=>{setSurname(e.target.value)}}required/>
        {surnameError && <div className='error'>{surnameError}</div>}
        <h3>Enter Contact info</h3>
        <input onChange={(e)=>{setContact(e.target.value)}}required/>
        {contactError && <div className='error'>{contactError}</div>}
        <h3>Enter Address</h3>
        <input onChange={(e)=>{setAddress(e.target.value)}}required/>
        {addressError && <div className='error'>{addressError}</div>}
        <h3>Enter ID Number</h3>
        <input onChange={(e)=>{setId(e.target.value)}}required/>
        <h3>Enter Salary</h3>
        <input onChange={(e)=>{setSalary(e.target.value)}}required/>
        <h3>Enter Occupation date</h3>
        <input type='date' onChange={(e)=>{setDate(e.target.value)}}/><br/>
        <h3>Upload Files</h3>
        <input type="file" className='btn' onChange={(e)=>{setImageUpload(e.target.files)}} /><br/>

        <button onClick={uploadImage} className='btn'>Upload Files</button><br/>
        <button className='addTenant' onClick={addTenant} disabled= {disabled}>Add Tenant</button>
      </div>
    </div>
  )
}

export default CreateTenant