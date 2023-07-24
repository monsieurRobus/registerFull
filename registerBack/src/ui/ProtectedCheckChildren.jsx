import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectedCheckChildren = ({children}) => {

    const user = localStorage.getItem('user')
    const userParse = JSON.parse(user)

    if (userParse == null ){
        return <Navigate to="/login" />
    }
    else 
    {
      if (userParse.active){
          return <Navigate to="/dashboard" />
      }

      else 
      { 
        return (
          children
        )
      }
  }

       
    
  
}

export default ProtectedCheckChildren