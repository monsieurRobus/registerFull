const User = require('../models/User.model')
const { confirmationCode } = require('../../utils/confirmationCode')
const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 3000
const ENDPOINT = process.env.ENDPOINT || `http://localhost:${PORT}`
const EMAIL = process.env.EMAIL || ''
const PASSWORD = process.env.PASSWORD || ''
const HOST = process.env.HOST || 'localhost'
const PROTOCOL = process.env.PROTOCOL || 'http://'


const getAllUsers = async (req, res, next) => {

    try {
            
        const users = await User.find()
        return res.status(200).json({ message: 'Users found', users: users })
    
    }
    catch (error)
    {
        return next(error)
    }

}

const getUserById = async (req, res, next) => {

    try {
        const { id } = req.params

        const userFound = await User.findById(id)

        if (userFound) {
            
            return res.status(200).json({ message: 'User found', user: userFound })
        
        }
        else
        {
            return res.status(404).json({ message: 'User not found' })
        }
    }
    catch(error)
    {
        return next(error)
    }

}

const registerUser = async (req, res, next) => {

    try {

        const { name, email, password, role } = req.body
        
        const confirmation = confirmationCode()

        const userExists = await User.findOne({email: email })

        if (!userExists) {
            const userToAdd = new User({ name, email, password, role, confirmation })
            const userAdded = await userToAdd.save()

            if (userAdded)
            {
                
                return res.status(200).json({ message: 'User added successfully', user: userAdded })
            }

        }
        else {

            return res.status(409).json({ message: 'User already exists' })

        }


    }
    catch (error) {
        return next(error)
    }

}

const activateUser = async (req, res, next) => {

    try {
        const { id, code } = req.body

        const userToActivate = await User.findById(id)

        if(userToActivate)
        {
            if(!userToActivate.active)
            {
                (userToActivate.confirmation === code) ? userToActivate.active = true : userToActivate.active = false
                const userActivated = await userToActivate.save()
                if(userActivated)
                {                    
                    return res.status(200).json({ message: 'User activated successfully', user: userToActivate })
                }
                else
                {
                    return res.status(500).json({ message: 'Error activating user' })
                }
            }
            else
            {
                return res.status(409).json({ message: 'User already activated' })
            }

        }
        else
        {
            return res(404).json({ message: 'User not found' })
        }

    }
    catch(error)
    {
        return next(error)
    }

}

const deleteUser = async (req, res, next) => {

    try {

        const { id } = req.params

        const userToDelete = await User.findById(id)

        if (userToDelete) {
            const userDeleted = await User.findByIdAndDelete(id)
            if (userDeleted) {
                return res.status(200).json({ message: 'User deleted successfully' })
            }
            else
            {
                return res.status(500).json({ message: 'Error deleting user' })
            }
        }
        else {
            return res.status(404).json({ message: 'User not found' })
        }

    }
    catch (error) {
        return next(error)
    }

}

module.exports = { 
    getAllUsers,
    getUserById,
    activateUser,
    registerUser,
    deleteUser }