import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { updateUserProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/Contextshare';



function Edit({projects}) {

  const {setEditResponse} = useContext(editResponseContext)

  const [ projectDetails , setProjectDetails] = useState({
       title:projects?.title,
      language:projects?.language,
      github:projects?.github,
      website:projects?.website,
      overview:projects?.overview,
      projectImage:""
  })

  const [preview , setPreview] = useState("")
  // console.log(projectDetails);
  

  
    const [show, setShow] = useState(false);

    const [key , setKey] = useState(0)

    const handleClose = () => {
      setShow(false);
      handleCancel()
    }
    const handleShow = () => setShow(true);

    const handlefile = (e)=>{
      setProjectDetails({...projectDetails, projectImage:e.target.files[0]})
    }

    useEffect(()=>{
      if(projectDetails.projectImage){
        setPreview(URL.createObjectURL(projectDetails.projectImage))
      }
    },[projectDetails.projectImage])
    console.log(preview);

    const handleCancel =()=>{
      setProjectDetails({

        title:projects.title,
        language:projects.language,
        github:projects.github,
        website:projects.website,
        overview:projects.overview,
        projectImage:""

      })
      setPreview("")
      if(key==0){
        setKey(1)
      }
      else{
        setKey(0)
      }

    }
    
    const handleUpdate = async() =>{
      const {title , language , github , website, overview} = projectDetails
      if(!title || !language ||!github || !website || !overview){
        toast.info('please fill the form compleately')

      }
      else{
        //reqbody

        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        preview?reqBody.append("projectImage", projectImage):reqBody.append("projectImage" ,projects.projectImage)

        const token = sessionStorage.getItem("token")

        if(preview){
          const reqHeader ={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
  
          }
          const result = await updateUserProjectApi(projects._id, reqBody , reqHeader)
          console.log(result);
          if(result.status==200){
            setEditResponse(result)
           
            toast.success('project updated succesfully')
            setTimeout(()=>{
              handleClose()
             },3002)
          }
          else{
            handleCancel()
            toast.error('something went wrong')
          }
          
        }
        else{
          const reqHeader = {

            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
    
          }
          const result = await updateUserProjectApi(projects._id, reqBody , reqHeader)
          console.log(result);
          if(result.status==200){
            setEditResponse(result)
            toast.success('project updated succesfully')
           setTimeout(()=>{
            handleClose()
           },2002)
           
          }
          else{
            handleCancel()
            toast.error('something went wrong')
          }
        }


      }
    }

    
    

  return (
    <>
    <FontAwesomeIcon  icon={faPenToSquare} className='mx-3' style={{color:'violet'}} onClick={handleShow}/>

    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="projectImage">
                            <input type="file" id='projectImage' style={{display:'none'}}  key={key} onChange={(e)=>handlefile(e)} />
                            <img src={ preview?preview:`${serverUrl}/upload/${projects.projectImage}`}alt="" className='w-100' />
                        </label>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3 mt-2">
                        <input type="text" placeholder='title' value={projectDetails.title}   className='form-control' onChange={(e)=>setProjectDetails({...projectDetails, title:e.target.value})} />
                        </div>
                        <div className="mb-3">   <input type="text" placeholder='language' value={projectDetails.language}  className='form-control' onChange={(e)=>setProjectDetails({...projectDetails, language:e.target.value})} /></div>
                        <div className="mb-3">   <input type="text" placeholder='github' value={projectDetails.github} className='form-control' onChange={(e)=>setProjectDetails({...projectDetails, github:e.target.value})} /></div>
                        <div className="mb-3">   <input type="text" placeholder='website' onChange={(e)=>setProjectDetails({...projectDetails, website:e.target.value})} value={projectDetails.website} className='form-control' /></div>
                        <div className="mb-3">
                            <textarea  rows={5}  placeholder='overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails, overview:e.target.value})}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            update
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      </Modal>
    </>
  )
}

export default Edit