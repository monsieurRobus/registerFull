import React from 'react'
import { useForm } from 'react-hook-form'
import './RegisterForm.css'
import { useNavigate } from 'react-router-dom'


const RegisterForm = () => {

    const { register, handleSubmit, errors } = useForm()
    const navigate = useNavigate()
    
    const onFormSubmit = (values) => {}

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

    const handleLogin = () => {

      navigate("/")
    }

  return (
    <div>
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
                
                
                

                <button type="submit">Register</button>
            </form>
            <button onClick={handleLogin} >Login!</button>
        </section>
    </div>
  )
}

export default RegisterForm