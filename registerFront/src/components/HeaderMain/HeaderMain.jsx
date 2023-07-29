import React, { useEffect } from 'react'
import './HeaderMain.css'
import { useAuth } from '../../hooks/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

const LoggedNav =({handleLogout,avatar}) => (
    <header className={'main'}>
        <nav className={'loggedNav'}>
            <div>
                <span>RegisterFull</span>
            </div>     
            <div className={'navMenu'}>
                <button onClick={handleLogout}>
                    <FontAwesomeIcon icon={faPowerOff} />
                </button><img className={'avatar'} src={avatar} alt="user avatar"/>
            </div>
        </nav>
    </header>
)
const NotLoggedNav = ({handleLogin}) => (
    <header className={'main'}>
        <nav className={'notLoggedNav'}>
            <div>
                <span>Not logged ._.</span>
            </div>
            <div>
                <button onClick={handleLogin}>login</button>
            </div>
        </nav>
    </header>
)

const HeaderMain = () => {
    
    const navigate = useNavigate()

    const handleLogin = () => {
        console.log('login')
        navigate('/login')
    }

    const { user, logout } = useAuth()

    useEffect(() => {

    },[user])

    return user ? <LoggedNav handleLogout={logout} avatar={user.avatar}/> : <NotLoggedNav handleLogin={handleLogin}/>

 
    
  
}

export default HeaderMain