import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import { AuthContextProvider } from './hooks/AuthContext.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'
import RegisterPage from './pages/Register/RegisterPage.jsx'
import {ConfirmationCode} from './pages/ConfirmationCode/ConfirmationCode.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthContextProvider>      
        <Routes>
          <Route path="/" element={<App />}>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/verifyCode" element={ <ConfirmationCode /> } />
          {/* <Route path="/profile" element={ <Profile /> } />
          <Route path="/dashboard" element={ <Dashboard /> } /> */}
          {/* <Route path="/holamundo" element={ <ProtectedRoute/> } >
            <Route path="" element={<h1>hola mundo</h1>} />
          </Route> */}
        </Route>
      </Routes>        
      </AuthContextProvider>
    </BrowserRouter>  
  </React.StrictMode>
)
