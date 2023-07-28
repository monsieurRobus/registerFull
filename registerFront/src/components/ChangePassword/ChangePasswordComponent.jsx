import React, { useEffect, useState } from 'react'
import { changePassword } from '../../services/user.service'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'

import useChangePassError from '../../hooks/useChangePassError'
import Swal from 'sweetalert2'

const ChangePasswordComponent = () => {

    const [send, setSend] = useState(false)
    const [res, setRes] = useState({})
    const { register, handleSubmit, errors } = useForm()
    const [ok, setOk] = useState(false)

    const navigate = useNavigate()

    const onError = (errors) => {}

    const onNewPassSubmit = async(values) => {

        try {
            if(values.newPassword != values.confirmPassword)
                {
                    Swal.fire({
                        icon: "error",
                        title: "The new password can't be the same as the old one",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    throw new Error("Passwords don't match")
                    
                }

            if(values.password == values.newPassword)
                {
                    Swal.fire({
                        icon: "error",
                        title: "The new password can't be the same as the old one",
                        showConfirmButton: false,
                        timer: 3000
                    })
                    throw new Error("New password must be different from the old one")
                }

        }
        catch(error) {
            return console.error(error.message)
        }
        
        const user = localStorage.getItem('user')
        const userParse = JSON.parse(user)


        const valuesToSend = {
            id : userParse._id,
            password: values.password,
            newPassword: values.newPassword
        }
        
        setSend(true)
        setRes(await changePassword(valuesToSend))
        setSend(false)
    }

    useEffect(() => {
        useChangePassError(res, setOk,setRes)
    }, [res])

    if(ok)
    {
        return <Navigate to="/dashboard" />
    }

  return (
    <div>
        <section>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit(onNewPassSubmit,onError)}>
          <div>
            <label>old Password</label>
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
            <label>New Password</label>
                  <input type="password" name="newPassword" {...register("newPassword", {
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
          <button 
                  type="submit"
                  disabled={send}                 
                >
                
                Send Password</button>
                </div>
        </form>
        </section>
    </div>
  )
}

export default ChangePasswordComponent