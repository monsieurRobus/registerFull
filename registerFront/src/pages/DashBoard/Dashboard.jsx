import React, { useDeferredValue, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'
import './Dashboard.css'
import Swal from 'sweetalert2'
import { deleteUser,update } from '../../services/user.service'
import useDeleteUserError from '../../hooks/useDeleteUserError'
import { useForm } from 'react-hook-form'


const Dashboard = () => {
  const [res, setRes] = useState({})
  const [send, setSend] = useState(false)
  const [deleteOk, setDeleteOk] = useState(false)
  const [edit, setEdit] = useState(false)
  const [classInput, setClassInput] =useState("input-disabled")
  const { user, userLogin,logout } = useAuth()
  const { register, handleSubmit, errors } = useForm()
  const navigate = useNavigate()

  const handleChangePassword = () => {
    return navigate('/changePassword');
  }
  
  
  
  const sendEditedProfile = async() => {

    setSend(true)
    setRes(await update(id))
    setSend(false)


  }

  const handleEditProfile = () => {

    navigate(`/dashboard/edit/${user._id}`)

  }

  const onFormErrors = (errors) => {}

  const handleDeleteUser = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      cancelButtonText: 'No, keep it',
    
    }).then(result => {

      executeDeleteUser(user._id)

    })

  }

  const executeDeleteUser = async (id) => {

    setSend(true)
    setRes(await deleteUser(id))
    setSend(false)

  }

  useEffect(() => {
  },[user])

  useEffect(() => {

    useDeleteUserError(res, setRes, setDeleteOk)

  },[res])

  


  if(deleteOk) {
    logout()
    userLogin(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    return <Navigate to="/login" />
  }

  return (
    <section>
        <div>
          <label>username:</label>
          <input className={classInput} type="text" name="Name" disabled={!edit} placeholder={user?.name} {...register("name", {})}/>
          <label>email:</label>
          <span>{user?.email}</span>
          <button onClick={handleChangePassword}>Change Password</button>
        </div>
        <div>
          <img className={"avatar-dashboard"} src={user?.avatar}/>
          <label>avatar:</label>
          <input className={classInput} type="text" name="avatar" disabled={!edit} placeholder={user?.avatar} {...register("avatar", {})}/>
          <label>Role:</label>
          <input className={classInput} type="email" name="email" disabled={!edit} placeholder={user?.role}/>
          <button onClick={handleEditProfile} disabled>Edit Profile</button>
          
        </div>
    </section>
  )
}

export default Dashboard