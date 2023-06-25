import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import RegisterForm from '../../components/RegisterForm/registerForm'
const RegisterPage = () => {
  return (
    <main>
        <FontAwesomeIcon className="logo" icon={faCircleNotch} />
        <h1>gigger</h1>
        <RegisterForm />
    </main>
  )
}

export default RegisterPage