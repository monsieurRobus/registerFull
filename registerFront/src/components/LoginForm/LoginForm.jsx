import React from 'react'
import { useForm } from 'react-hook-form'
import './LoginForm.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const LoginForm = () => {

    const { register, handleSubmit, errors } = useForm()
    const navigate = useNavigate()
    const onFormSubmit = (values) => {

       
       login(values.username, values.password)

    }

    const onFormErrors = (errors) => {

        const errorFields = document.querySelectorAll(".error")

        for(const errorField of errorFields) {
            errorField.classList.remove("error")
        }
    
        for(const error in errors) {
            console.log(errors[error].ref)
            errors[error].ref.classList.add("error")
        }
    }

    const handleRegister = () => {
        navigate("/register")
    }

  return (
    <section>        
        <form onSubmit={handleSubmit(onFormSubmit, onFormErrors)}>
            <div>
                <label>Username</label>
                <input type="text" name="username" {...register("username", {
                    required: true,
                    minLength: 3,
                })} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" placeholder= "Password" {...register("password", {
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
            
            <button type="submit">Login</button>
           
        </form>
        <button onClick={handleRegister}>Register</button>
    </section>
  )
}

export default LoginForm