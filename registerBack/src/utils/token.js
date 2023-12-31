const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateToken = (id, email, role) => {
    if (!id || !email)
    {
        throw new Error('Email or ID are missing')
    }
    return jwt.sign({ id: id, email, role }, process.env.JWT_TOKEN, { expiresIn: '1h' })
}

const verifyToken = (token) => {
    if(!token){
        throw new Error('Token is missing')
    }
    return jwt.verify(token, process.env.JWT_TOKEN)
}

module.exports = { generateToken, verifyToken}


