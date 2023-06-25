import { useEffect, useState } from 'react'
import './App.css'
import registerForm from './components/RegisterForm/registerForm'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'



function App() {
  useEffect(() => {

    console.log("componente montado uwu")

  }, [])

  return (
    <Routes>
      <Route path="/" element={ <LoginPage /> } />
      <Route path="/register" element={ <RegisterPage /> } />
      {/* <Route path="/holamundo" element={ <ProtectedRoute/> } > */}
        <Route path="/hola" element={<h1>hola mundo</h1>} />
      {/* </Route> */}
    </Routes>
  )
}

export default App
