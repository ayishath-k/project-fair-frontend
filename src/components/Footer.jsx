import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
    <div className='p-5 mt-5' style={{backgroundColor:'seagreen'}}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow}  className='me-3'/>Project Fair</h3>
                    <p className='mt-3' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dicta delectus illo, ea error tempora id! Doloremque sint expedita quo facere, dicta sunt tempore corrupti temporibus ad iusto consequuntur sed?</p>

                </div>
                <div className="col-md-2 d-md-flex justify-content-center align-items-center">

                  <div>
                        <h3 className='text-light'>Guides</h3>
                        <p className='mt-3'>Home</p>
                        <p>Project</p>
                        <p>Dashboard</p>
                  </div>
                    
                    </div>
                    <div className="col-md-1">
                    
                    </div>
                    <div className="col-md-2">
                        
                  <div>
                        <h3 className='text-light'>Links</h3>
                        <p className='mt-3'>React</p>
                        <p>React Bootstrap</p>
                        <p>Bootswatch</p>
                  </div>
                    
                    </div>
                    <div className="col-md-3">
                        <h3 className='text-light '>Contact Us</h3>
                        <div className='d-flex mt-3'>
                            <input type='text' placeholder='Email-id' className='form-control rounded-0'/>
                            <button className='btn btn-warning ms-3'>Subscribe</button>

                        </div>
                        <div className="d-flex mt-4 justify-content-between">
                            <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light'/>
                            <FontAwesomeIcon icon={faTwitter} className='fa-2x text-light'/>
                            <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light'/>
                            <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-light'/>
                        </div>
                    
                    </div>
                
                </div>
        </div>
    </div>
  )
}

export default Footer