import React from 'react'
import LandingPage from "../src/Pages/LandingPage.jsx"
import Login from './Pages/Login.jsx'
import Signup from "./Pages/Signup.jsx";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Dashboard from './Components/Admin/Dashboard.jsx';

const App = () => {
  return (

    <>
    <Router>
    <LandingPage/>
    <Dashboard/>
      <Routes>
        <Route path='Signup' element={<Signup/>}/>
        <Route path='Login' element={<Login/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
