import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {db} from '../firebaseConfig';
import {collection, deleteDoc, onSnapshot, doc} from 'firebase/firestore';

function Home({isAuth}) {
  
  let nav = useNavigate();

  const toTenants=()=>{ //nav to create tenants
    nav('/createTenant');

  }
  const tenantCollectionRef= collection(db, 'tenants'); //collection ref

  const [tenantList, setTenantList] = useState([]); //tenant list /cards state

  useEffect(() => {  //loads all the tenants
    
    onSnapshot(tenantCollectionRef, (snapshot) => {
     setTenantList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      
      
    });
  }, []);

  const handleTenantClicked =  (doc) =>{ //most complex part, uses useNavigate states to grab the tenant as the selected doc
    nav('/doc',{state :{tenant: doc}});  // then navs to the doc page with the doc as the tenant/state reference
  }
 
  const DeleteTenant=async(id)=>{  //deletes a doc
    const TDoc = doc(db, 'tenants', id);
    await deleteDoc(TDoc);
    nav('/');
  }

  const editClick = (doc)=>{  //same as handle just for the unfinished edit function
    nav('/edit', {state:{tenant:doc}})
  }






  return ( // mapping ui and functionallity
    <div className='Home'>
      <button className='AddTenantButton' onClick={toTenants}>Add Tenant</button>

      <div className="homePage">
        {tenantList.map((tenant)=>{
          return(
           <div className='CardCont' >
            <div className="Card" onClick={()=>{handleTenantClicked(tenant)}}>
              <div className="CardTitle">
                <h3>{tenant.Name} {tenant.Surname}</h3>
                <h4>{tenant.Address}</h4>
                <h5>{tenant.Contact}</h5>
                
              </div>
             

            </div>
            <div className="cardButtons">
            <button onClick={()=>{DeleteTenant(tenant.id)}} className='btn'>
                Delete
              </button>
              <button className='btn' onClick={()=>{editClick(tenant)}} >Edit</button>
            </div>
            </div>

            
            
            

          );
        })}

      </div>
    </div>
  )
}

export default Home
