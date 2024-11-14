import React, { useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function Addproject() {
    const [show, setShow] = useState(false);

    const {setAddResponse} = useContext(addResponseContext)


    const [projectDetails , setProjectDetails] = useState({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImage:""
    })

    const [preview , setPreview] = useState("")
    const [token, setToken] = useState("")
    const [key, setKey] = useState(1)
    // console.log(projectDetails);
    // console.log(preview);
    // console.log(token);
    
    

    const handleFile =(e)=>{
      setProjectDetails({...projectDetails,projectImage:e.target.files[0]})
    }
    

  const handleClose = () => {setShow(false)
    handleCancel()
  }
  const handleShow = () => setShow(true);

  const handleCancel =()=>{
    
    setProjectDetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImage:""

    })
    setPreview("")
    if(key==1){
      setKey(0)
    }
    else{
      setKey(1)
    }
    
  }

  const handleAdd = async()=>{
    const {title , language, github, website, overview,projectImage} = projectDetails
    if(!title || !language || !github || !website||!overview || !projectImage){
      toast.info('please fill the form completely')
    }
    else{
      //append() if the request contain uploaded content the form data should be send with the help of append() in the form data class-inshort req body should be a form data
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      if(token){
        const reqHeader ={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`

        }
        const result = await addProjectApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success('project added succesfully')
          setTimeout(()=>{
            handleClose()

          },2003)
          setAddResponse(result)
         
        }
        else if(result.status==406){
          toast.warning(result.response.data)
          handleCancel()
        }
        else{
          toast.error('something went wrong')
          handleClose()
        }
        
      }
      else{
        toast.warning('please login')
      }


    }
  }
  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }

  },[])

  return (
  <> 
  <button className='btn rounded-0' style={{backgroundColor:'#28A61F'}} onClick={handleShow}>Add Project</button>

  <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="projectImage">
                            <input key={key} onChange={(e)=>handleFile(e)} type="file" id='projectImage' style={{display:'none'}}/>
                            <img src= {preview?preview:"https://icon-library.com/images/image-icon-png/image-icon-png-5.jpg" }alt="" className='w-100' />
                        </label>
                    </div>
                    <div className="col-md-6">
                        <div value={projectDetails.title} className="mb-3 mt-2">
                            <input type="text" placeholder='title' onChange={(e)=>setProjectDetails({...projectDetails, title:e.target.value})}className='form-control' />
                        </div>
                        <div className="mb-3">   <input  value={projectDetails.language} type="text" placeholder='language'onChange={(e)=>setProjectDetails({...projectDetails, language:e.target.value})} className='form-control' /></div>
                        <div className="mb-3">   <input type="text"  value={projectDetails.github} placeholder='github' className='form-control'onChange={(e)=>setProjectDetails({...projectDetails, github:e.target.value})} /></div>
                        <div className="mb-3">   <input type="text"  value={projectDetails.website}placeholder='website'onChange={(e)=>setProjectDetails({...projectDetails, website:e.target.value})} className='form-control' /></div>
                        <div className="mb-3">
                            <textarea   value={projectDetails.overview} rows={5}  placeholder='overview' onChange={(e)=>setProjectDetails({...projectDetails, overview:e.target.value})}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
   </>
  )
}

export default Addproject