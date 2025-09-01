import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'

import Home from './pages/Home'
import Appointment from './pages/Appointment'
import Feedback from './pages/Feedback'
import Contact from './pages/Contact'

//  About
import About from './pages/About/About'
import Ouremories from './pages/About/Ouremories'
import Achievement from './pages/About/Achievement'
// Our Specialty
import Hooponopono from './pages/Ourspecialty/Hooponopono'
import LamaferaYogmaya from './pages/Ourspecialty/LamaferaYogmaya'
import LifeCoaching from './pages/Ourspecialty/LifeCoaching'
import TwinFlame from './pages/Ourspecialty/TwinFlame'
import Login from './pages/Login'
import Dashboard from './pages/Superadmin/Dashboard'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/appointment' element={<Appointment/>} />
        <Route path='/feedback' element={<Feedback/>} />
        <Route path='/contact' element={<Contact/>} />
        

        {/* About */}
        <Route path='/about' element={<About/>} />
        <Route path='/ouremories' element={<Ouremories/>} />
        <Route path='/achievement' element={<Achievement/>} />

        {/* Our Specialty */}
        <Route path='/hooponopono' element={<Hooponopono/>} />
        <Route path='/lamaferaYogmaya' element={<LamaferaYogmaya/>} />
        <Route path='/lifeCoaching' element={<LifeCoaching/>} />
        <Route path='/twinFlame' element={<TwinFlame/>} />

        <Route path='/login' element={<Login/>} />
        {/* Superadmin */}
        <Route path='/dashboard' element={<Dashboard/>} />
        {/* <Route path='/superadmin/contacts' element={<Contacts/>} /> */}
        {/* <Route path='/superadmin/appointments' element={<Appointments/>} /> */}
        


      </Routes>
    </BrowserRouter>
  )
}

export default App