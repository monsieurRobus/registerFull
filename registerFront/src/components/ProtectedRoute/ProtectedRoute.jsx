import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

  const user = localStorage.getItem('user')
  const userParse = JSON.parse(user)

    if(!userParse) return <Navigate to="/" />
    else 
    {
      if (!userParse.active)
      {
        return <Navigate to="/verifyCode" />
      }
      else 
      {
        return (children)
      }
    }

  return children
}

export default ProtectedRoute