import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import photo from '../assets/homeimg.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import { homeProjectApi } from '../services/allApi'

// import ProjectCard from '../components/ProjectCard'


function Home() {

  const [isLogin ,setIsLogin] = useState(false)
  const [homeProject , setHomeProject] = useState([])

  const getHomeProject = async()=>{
    const result = await homeProjectApi()

    setHomeProject(result.data)
  }
  console.log(homeProject);
  

  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
  },[])
  return (
    <>
    <Header/>
    <div style={{height:'100vh',backgroundColor:'seagreen'}} className=' p-5' >
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <h1 style={{fontSize:'70px',color:'white'}}>Project fair</h1>
          <p>One stop destination for all software development Projects</p>
          { isLogin == false ?<Link to={'/login'}><button className='btn text-light p-0 mt-3'>Get Started <FontAwesomeIcon icon={faArrowRight}/></button></Link>
          :
          <Link to={'/dashboard'}><button className='btn text-light p-0 mt-3'>Manage Project<FontAwesomeIcon icon={faArrowRight}/></button></Link>}
            
            </div>
            <div className="col-md-6">
              <img src={photo} alt="no image" className='w-70' />
            
            </div>
        </div>
      </div>
    </div>

    <div>
      <h1 className='mt-5 text-center'>Explore our Projects</h1>
      <div className="row w-100 p-5">
        
        {homeProject?.map((item)=>(
          <div className="col-md-4 px-5 py-3">
          <ProjectCard project = {item}/>
        </div>
        ))
        }
        
      </div>
      <Link to={'/projects'} style={{color:'red'}} className='text-center mt-4'><p>See more Projects</p></Link>
    </div>


    </>
    

    
  )
}

export default Home