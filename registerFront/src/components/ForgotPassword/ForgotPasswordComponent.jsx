import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { forgotPassword } from '../../services/user.service'
import useChangePassError from '../../hooks/useChangePassError'
import { Navigate } from 'react-router-dom'




const ForgotPasswordComponent = () => {
  const [send, setSend] = useState(false)
  const [res, setRes] = useState({})
  const { register, handleSubmit, errors } = useForm()
  const [ok, setOk] = useState(false)

const onEmailSubmit = async (values) => {
  setSend(true)
  setRes(await forgotPassword(values))
  setSend(false)
}

const onError = (errors) => {

}

useEffect(() => {
  useChangePassError(res, setOk, setRes)

}, [res])

if (ok) { 
  return <Navigate to="/login" />
}


  return (
    <div>
      <section>
        <h1>Forgot Password</h1>
        <h2>Enter your email and you will receive a provisional password</h2>
        <form onSubmit={handleSubmit(onEmailSubmit,onError)}>
          <div>
            <label>Email</label>
            <input type="email" name="email" {...register("email", {})} />
          </div>
          <button 
                  type="submit"
                  disabled={send}                 
                >
                
                Send Password</button>
        </form>
      </section>
    </div>
  )
}

export default ForgotPasswordComponent