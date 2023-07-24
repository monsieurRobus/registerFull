import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { checkCodeConfirmationUser } from '../../services/user.service'
import { useCheckCodeError } from '../../hooks/useCheckCodeError'
import {useAutoLogin } from '../../hooks/useAutoLogin'
import ButtonResend from '../../components/ButtonResend/ButtonResend'


export const ConfirmationCode = () => {
    const [res,setRes] = useState({})
    const [send, setSend] = useState(false)
    const [ok, setOk] = useState(false)
    const [reloadPageError, setReloadPageError] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    const { allUser, userLogin, setUser, user, bridgeData } = useAuth()
    const { register, handleSubmit, errors } = useForm()
    
    const onFormSubmit = async (values) => {

        const user = localStorage.getItem('user')

        if (user == null){

            const customFormData = {
                email: allUser.data.user.email,
                confirmationCode: parseInt(values.confirmationCode),
              };

        setSend(true)
        setRes(await checkCodeConfirmationUser(customFormData))
        setSend(false)
        }

    else 
    {
        const emailToCheck = JSON.parse(user).email
        const customFormData = {
            email: emailToCheck,
            confirmationCode: parseInt(values.confirmationCode),
        }

        setSend(true)
        setRes(await checkCodeConfirmationUser(customFormData))
        setSend(false)
    }
}

// USE EFFECT PARA GESTIONAR ERRORES Y EXITOS USANDO CUSTOM HOOKS

useEffect(() => {

  useCheckCodeError(
    res,
    setDeleteUser,
    setOk,
    setUser,
    setReloadPageError,
    setRes
  );
}, [res])

if(ok) {
  if(!localStorage.getItem('user')){
    setOk(()=>false)
    useAutoLogin(allUser, userLogin, setOk)
  return <Navigate to="/login" />
  }
  else 
  {
    return <Navigate to="/dashboard" />
  }
}

if(reloadPageError){
  return <Navigate to="/login" />
}
  return (
    <div>
        <h1>Verify your code</h1>
        <h2>A code has been sent to your email, please, enter your code bellow:</h2>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <input type="text" name="name" id="code" {...register('confirmationCode', {required: false})} />
            <label htmlFor="custom-input" className="custom-placeholder">
              Registration code
            </label>
            <button type="submit" disabled={send}>Verify Code</button>
        </form>
        <h3>Didn't receive your code?</h3><ButtonResend />
    </div>
  )
}
