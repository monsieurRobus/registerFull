import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import './RegisterForm.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/user.service'
import { useAuth } from '../../hooks/AuthContext'
import { useRegisterError } from '../../hooks/useRegisterError'



const RegisterForm = () => {

    const { register, handleSubmit, errors } = useForm()
    const { allUser, setAllUser, bridgeData } = useAuth()
    const [res, setRes] = useState({})
    const [send, setSend] = useState(false)
    const [registerOk, setRegisterOk] = useState(false)
    const [registerError, setRegisterError] = useState(false)    

    const navigate = useNavigate()
    
    const onFormSubmit = async (values) => {
      const valuesToSend =
      {
        name: values.username,
        password: values.password,
        email: values.email
      }
    
    setSend(true)
    setRes(await registerUser(valuesToSend))
    setSend(false)
    


    }

    useEffect(() => {
      useRegisterError(res, setRegisterOk, setRes, setAllUser)
      if (res?.status == 200) bridgeData("ALLUSER")
    }, [res])

    const onFormErrors = (errors) => {

      const errorFields = document.querySelectorAll(".error")

      console.log(errors)
        for(const errorField of errorFields) {
            errorField.classList.remove("error")
        }
    
        for(const error in errors) {
            console.log(errors)
            errors[error].ref.classList.add("error")
        }
    }

    if(registerOk) {
      return <Navigate to="/verifyCode" />
    }

    const handleLogin = () => {
      navigate("/")
    }

  return (
    <div>
        <section>
            <form onSubmit={handleSubmit(onFormSubmit, onFormErrors)}>
                <div>                  
                  <label>Username</label>
                  <input type="text" name="name" {...register("username", {
                    required: true,
                    minLength: 3,
                })} />
                </div>
                <div>
                  <label>Password</label>
                  <input type="password" name="password" {...register("password", {
                    required: true,
                    minLength: 8,
                    vaidate: {
                        format: password => {
                            return (
                                /[A-Z]/g.test(password) &&
                                /[a-z]/g.test(password) &&
                                /[0-9]/g.test(password) 
                            )
                        } 
                    }
                })} />
                </div>
                <div>
                  <label>Confirm Password</label>
                  <input type="password" name="confirmPassword" {...register("confirmPassword", {
                    required: true,
                    minLength: 8,
                    vaidate: {
                        format: password => {
                            return (
                                /[A-Z]/g.test(password) &&
                                /[a-z]/g.test(password) &&
                                /[0-9]/g.test(password) 
                            )
                        } 
                    }
                })} />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" name="email" {...register("email", {})} />
                </div>
                
                
                

                <button 
                  type="submit"
                  disabled={send}                 
                >
                
                Register</button>
            </form>
            <button onClick={handleLogin} >Login!</button>
        </section>
    </div>
  )
}

export default RegisterForm