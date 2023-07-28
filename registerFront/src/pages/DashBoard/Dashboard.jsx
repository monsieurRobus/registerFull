import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const navigate = useNavigate()

  const handleChangePassword = () => {
    return navigate('/changePassword');
  }

  return (
    <div>
      <h1></h1>
      <h2></h2>
      <h2></h2>
      <h2>Change Password</h2>
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  )
}

export default Dashboard