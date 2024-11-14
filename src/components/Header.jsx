import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useContext, useEffect, useState } from 'react'

import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/Contextshare';

function Header() {
  const [token , setToken] = useState("")
  const navigate = useNavigate()
  const {setLoginResponse} = useContext(loginResponseContext)

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
      }
    },[])

    const handleLogout =()=>{
      sessionStorage.removeItem("existingUser")
      sessionStorage.removeItem("token")
      setLoginResponse(false)
      navigate('/')
    }
  
  return (
    <>
        <Navbar className=" d-flex align-items-center px-5" style={{backgroundColor:"seagreen"}}>
        
         
          <Link  to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand className='text-light ' >
             
               <span className='fs-3 ms-5'><h3><FontAwesomeIcon icon={faStackOverflow}/> Project Fair</h3></span>
            </Navbar.Brand>
          </Link>
          { token &&<button onClick={handleLogout} className='btn btn-warning ms-auto rounded'><FontAwesomeIcon icon={faPowerOff} className='me-2'/>Logout</button>}
        
      </Navbar>
    </>
  )
}

export default Header