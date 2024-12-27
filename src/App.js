import React from 'react'
import LandingPage from "../src/Pages/LandingPage.jsx"
import Login from './Pages/Login.jsx'
import Signup from "./Pages/Signup.jsx";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Dashboard from './Components/Admin/Dashboard.jsx';
import EventList from './Components/Admin/EventList.jsx';
import CreateEventForm from "./Components/Admin/CreateEventForm.jsx"
import RoleSuggestionPanel from "./Components/Admin/RoleSuggestionPanel.jsx"

const App = () => {
  return (

    <>
    <Router>
  
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
      <Route path='/admin/login' element={<Login/>}/>
      <Route path='/admin/Dashboard' element={<Dashboard/>}/>
      <Route path='/admin-dashboard/create-event' element={<CreateEventForm/>}/>
      <Route path='/admin/event' element={<EventList/>}/>
      <Route path='/admin-dashboard/role-suggestions' element={<RoleSuggestionPanel/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
