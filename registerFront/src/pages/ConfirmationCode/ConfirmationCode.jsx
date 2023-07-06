import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { checkCodeConfirmationUser } from '../../services/user.service'


export const ConfirmationCode = () => {
    const [res,setRes] = useState({})
    const [send, setSend] = useState(false)
    const [ok, setOk] = useState(false)
    const [reloadPageError, setReloadPageError] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    const { allUser, userLogin, setUser, user } = useAuth()
    const { register, handleSubmit, errors } = useForm()
    
    const onFormSubmit = async (values) => {

        const email = localStorage.getItem('email')

        if (email == null){

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
        const emailToCheck = JSON.parse(email)
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

    


}, [res])

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
    </div>
  )
}
