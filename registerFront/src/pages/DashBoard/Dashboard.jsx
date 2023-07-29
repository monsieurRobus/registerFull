import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'
import './Dashboard.css'


const Dashboard = () => {
  const [edit, setEdit] = useState(false)
  const [classInput, setClassInput] =useState("input-disabled")
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleChangePassword = () => {
    return navigate('/changePassword');
  }
  
  
  const handleEditProfile = () => {

    setEdit(!edit)

  }
  const sendEditedProfile = () => {

    console.log("enviar")

  }

  useEffect(() => {
  },[user])

  useEffect(() => {

    edit ? setClassInput("input-active") : setClassInput("input-disabled")

  },[edit])

  return (
    <section>
      <div>
        <label>username:</label>
        <input className={classInput} type="text" name="username" disabled={!edit} placeholder={user?.username}/>
        <label>email:</label>
        <span>{user?.email}</span>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <div>
        <img className={"avatar-dashboard"} src={user?.avatar}/>
        <label>avatar:</label>
        <input className={classInput} type="text" name="username" disabled={!edit} placeholder={user?.avatar}/>
        <label>Role:</label>
        <input className={classInput} type="email" name="email" disabled={!edit} placeholder={user?.role}/>
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={sendEditedProfile} hidden={!edit}>Save</button>
      </div>
      
    </section>
  )
}

export default Dashboard