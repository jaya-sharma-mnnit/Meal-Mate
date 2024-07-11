import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import AppDownload from './components/AppDownload/AppDownload'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'

const App = () => {
  const [ShowLogin,setShowLogin]=useState(false)
  return (
    <>
    {ShowLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/cart' element={<Cart/>}/>
        
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        
        </Routes>
    </div>
    <AppDownload/>
    <Footer/>
    
    </>
  )
}

export default App
