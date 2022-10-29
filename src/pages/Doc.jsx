import React from 'react'

import { useLocation } from 'react-router-dom';



function Doc({isAuth}) {
   

 
  
  const location = useLocation(); //grabs the data thats been passed by the home page
  
  // the mapping uses the locations state tenant and then maps from that tenant's data
  
 
 
   
  return (
    <div className='docCont'>
      <h1>{location.state.tenant.Name} {location.state.tenant.Surname}</h1>
      <h2 className='docContCol'>Property:</h2>
      <h2 className='Card'> {location.state.tenant.Address}</h2>
      <h2 className='docContCol'>Details: </h2>
      <div className="Card">
        <h3>Contact Info: {location.state.tenant.Contact}</h3>
        <h3>Salary: {location.state.tenant.Salary}</h3>
        <h3>Occupation Date: {location.state.tenant.Date}</h3>
        <h3>ID: {location.state.tenant.Id}</h3>
      </div>
      
      
      
    </div>
    
  )
}

export default Doc