import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Layout and pages
import Layout from './components/Layout'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Features from './pages/Features'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Memorials from './pages/Memorials'
import Wills from './pages/Wills'
import Beneficiaries from './pages/Beneficiaries'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import WillCreation from './pages/WillCreation'
import Fundraiser from './pages/Fundraiser'
import Marketplace from './pages/Marketplace'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateAccount from './pages/CreateAccount'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-account" element={<CreateAccount />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="memorials" element={<Memorials />} />
          <Route path="wills" element={<Wills />} />
          <Route path="beneficiaries" element={<Beneficiaries />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-will" element={<WillCreation />} />
          <Route path="fundraiser" element={<Fundraiser />} />
          <Route path="marketplace" element={<Marketplace />} />
        </Route>
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <WhatsAppFloat />
    </Router>
  )
}

export default App
