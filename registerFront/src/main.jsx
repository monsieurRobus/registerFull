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
import ProtectedCheckChildren from '../../registerBack/src/ui/ProtectedCheckChildren.jsx'
import Dashboard from './pages/DashBoard/Dashboard.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'
import ChangePassword from './pages/ChangePassword/ChangePassword.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthContextProvider>      
        <Routes>
          <Route path="/" element={<App />}>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/forgotPassword" element={ <ForgotPassword /> } /> 
          <Route path="/changePassword" element={
            <ProtectedRoute>            
              <ChangePassword />
            </ProtectedRoute>
          }/>
          <Route path="/verifyCode" element={ 
            <ProtectedCheckChildren>
              <ConfirmationCode />
            </ProtectedCheckChildren> } />
          <Route path="/dashboard">
            <Route path="" element={ 
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute> 
            } />
            {/* <Route path="/dashboard/edit/:userId" element={ 
            <ProtectedRoute>
              <EditDashboard />
            </ProtectedRoute> 
            } /> */}
          </Route> 
        </Route>
      </Routes>        
      </AuthContextProvider>
    </BrowserRouter>  
  </React.StrictMode>
)
