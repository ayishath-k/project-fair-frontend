import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginApi, registerApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare';

function Auth({register}) {

  const {setLoginResponse} = useContext(loginResponseContext)
  const navigate = useNavigate()

  const [userDetails , setUserDetails] = useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userDetails);

  const handleRegister =async()=>{
  const {username, email,password} = userDetails
  if(!username || !email || !password){
    toast.info('please fill the form completely')
  }
  else{
    const result = await registerApi(userDetails)
    console.log(result);
    if(result.status==200){
      toast.success('registration succesfull')
      setUserDetails({
        username:"",
        email:"",
        password:""

      })
      navigate('/login')
    }
    else if(result.status==406){
      alert(result.response.data)
    }
    else{
      toast.error('something went wrong')
    }
    

  }


  }

  const handleLogin = async()=>{
    const {email,password}=userDetails
    if(!email || !password){
      toast.info('please fill the form completely')
    }
    else{
      const result = await loginApi({email,password})
      console.log(result);
      if(result.status==200){
        toast.success('Login successful')
        setLoginResponse(true)

        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token" ,result.data.token)

        setUserDetails({
          username:"",
          email:"",
           password:""

        })
        navigate('/')
      }
      else if(result.status==406){
        toast.warning(result.response.data)
      }
      else{
        toast.error('something went wrong')
      }
      
      
    }


  }
  


  return (
   <>
      <div className="container-fluid p-5" style={{backgroundColor:"seagreen"}}>
        <div className="row d-flex justify-content-center align-items-center column-flex">
          <div className="col-md-1"></div>
          
          <div className="col-md-5">
           
            <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" className='w-50' />
          </div>
          <div className="col-md-5">
          <div className='align-items-center mb-5 text-light'>
            <span className='fs-3 ms-5 text-light'><h3><FontAwesomeIcon icon={faStackOverflow}/> Project Fair</h3></span>
           {!register ? <h4>Sign in to your account</h4>:
            <h4>Sign up to your account</h4>}
          </div>
  
  
  { register && <input type="text" placeholder='username' value={userDetails.username} className='form-control mt-3 rounded-0' onChange={(e)=>setUserDetails({...userDetails, username:e.target.value})} />}
            <input type="text" value={userDetails.email} placeholder='Email-id' className='form-control mt-3 rounded-0' onChange={(e)=>setUserDetails({...userDetails, email:e.target.value})}  />
            <input type="text" value={userDetails.password} placeholder='Password' className='form-control mt-3 rounded-0' onChange={(e)=>setUserDetails({...userDetails, password:e.target.value})}  />
          { !register ? <div>
              <button onClick={handleLogin} className='btn btn-warning mt-3 rounded-0 shadow'>Login</button>
              <h4 className= 'mt-4'>New User? click here to <Link to={'/Register'}><span style={{color:'white'}}>Register</span></Link> </h4>
            </div>
            :
  
            <div>
              <button className='btn btn-warning mt-3 rounded-0 shadow' onClick={handleRegister}>Register</button>
              <h4 className= 'mt-4'>already a User? click here to <Link to={'/login'}><span style={{color:'white'}}>login</span></Link> </h4>
            </div>}
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
   </>
  )
}

export default Auth
