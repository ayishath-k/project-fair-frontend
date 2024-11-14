
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Pagenotfound from './pages/Pagenotfound'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import { useContext } from 'react'
import { loginResponseContext } from './context/Contextshare'






function App() {
 const {loginResponse} = useContext(loginResponseContext)

  return (

    <>
    
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Projects' element={loginResponse?<Projects/>:<Pagenotfound/>}></Route>
      <Route path='/login' element={<Auth/>}></Route>
      <Route path='/Register' element={<Auth register={true}/>}></Route>
      <Route path='/Dashboard' element={loginResponse?<Dashboard/>:<Pagenotfound/>}></Route>
      <Route path='/*' element={<Pagenotfound/>}></Route>
     
    </Routes>
    <Footer/>
   
  
     
    </>
  )
}

export default App
