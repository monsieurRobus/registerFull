const User = require('../models/User.model')
const { confirmationCode } = require('../../utils/confirmationCode')
const { generateToken } = require('../../utils/token')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
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
        
        const emailCode = process.env.EMAIL
        const passwordCode = process.env.PASSWORD_EMAIL
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailCode,
                pass: passwordCode
            }
        })

        const confirmation = confirmationCode()
        const { name, email, password, role } = req.body
        const userExists = await User.findOne({email: email })

        if (!userExists) {
            const userToAdd = new User({ name, email, password, role, confirmation })
            const userAdded = await userToAdd.save()

            const mailOptions = {
                from: emailCode,
                to: email,
                subject: `This is your confirmation code for ${process.env.APP_NAME}`,
                html: `<h1>This is your confirmation code for  ${process.env.APP_NAME}</h1><h2>${confirmation}</h2>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              })

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

const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(404).json('User not found')
        
      } else {
        
        if (bcrypt.compareSync(password, user.password)) {
            
          const token = generateToken(user._id, email);
            
          return res.status(200).json({
            user: {
              email,
              _id: user._id,
            },
            token,
          });
        } else {
            return res.status(404).json('Invalid password');
        }
      }
    } catch (error) {
      return next(
        error.message
      );
    }
  };


  
const activateUser = async (req, res, next) => {

    try {
        const { email, confirmationCode } = req.body

        const userToActivate = await User.findOne({email: email})
        delete userToActivate.password

        if(userToActivate)
        {
            if(!userToActivate.active)
            {
                userToActivate.active = (parseInt(userToActivate.confirmation) === confirmationCode) ? true : false
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
            return res.status(404).json({ message: 'User not found' })
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
    deleteUser,
    loginUser }