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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthContextProvider>      
        <Routes>
          <Route path="/" element={<App />}>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/verifyCode" element={ 
            <ProtectedCheckChildren>
              <ConfirmationCode />
            </ProtectedCheckChildren> } />
          <Route path="/dashboard" element={ 
            <ProtectedRoute>
              <h1>Holo</h1>  
            </ProtectedRoute> 
            } />
        </Route>
      </Routes>        
      </AuthContextProvider>
    </BrowserRouter>  
  </React.StrictMode>
)
