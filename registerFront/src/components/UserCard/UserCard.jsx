import React from 'react'
import './UserCard.css'

const UserCard = ({name,role,avatar}) => {
  return (
    <figure className={'user-card'}>
        <h2>{name}</h2>
        <h2>{role}</h2>
        <img src={avatar} alt="user avatar"/>
    </figure>
  )
}

export default UserCard