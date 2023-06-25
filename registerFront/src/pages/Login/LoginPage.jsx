import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import LoginForm from '../../components/LoginForm/LoginForm'

const LoginPage = () => {
  return (
    <main>
        <FontAwesomeIcon className="logo" icon={faCircleNotch} />
        <h1>gigger</h1>
        <LoginForm />
    </main>
  )
}

export default LoginPage