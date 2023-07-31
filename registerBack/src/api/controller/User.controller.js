const User = require('../models/User.model')
const mongoose = require('mongoose')
const { confirmationCode } = require('../../utils/confirmationCode')
const { generateToken, verifyToken } = require('../../utils/token')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const randomPassword = require('../../utils/randomPassword')

const PORT = process.env.PORT || 3000
const ENDPOINT = process.env.ENDPOINT || `http://localhost:${PORT}`
const EMAIL = process.env.EMAIL || ''
const PASSWORD = process.env.PASSWORD_EMAIL || ''
const HOST = process.env.HOST || 'localhost'
const PROTOCOL = process.env.PROTOCOL || 'http://'


const getAllUsers = async (req, res, next) => {

    try {

        const countUsers = await mongoose.connection.db.collection('users').countDocuments()        
        console.log(countUsers)
        const {authorization} = req.headers
        const token = authorization.split(' ')[1]
        const decoded = verifyToken(token)
        const users = await User.find()
        return res.status(200).json({ message: 'Users found', users: users })
    
    }
    catch (error)
    {
        return next(error)
    }

}

const getAllUsersPaginated = async (req, res, next) => {

  try{
      
      const { pageReq } = req.params
      const page = parseInt(pageReq)
      const limit = 6
      const skip = (page - 1) * limit
      const countUsers = await mongoose.connection.db.collection('users').countDocuments()
      const totalPages = Math.ceil(countUsers / limit)
      const users = await User.find().skip(skip).limit(limit)
      return res.status(200).json({ message: 'Users found', users: users, totalPages: totalPages, currentPage: page, limit })

  }
  catch(error)
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

const resendCode = async (req, res, next) => {
    try {

      // NodeMailer Config
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });

      // User Exists?
      const userExists = await User.findOne({ email: req.body.email });
      
      if (userExists) {
        const mailOptions = {
          from: EMAIL,
          to: req.body.email,
          subject: 'Confirmation code ',
          html: `<h1>Register FUll</h1><h2>This is yout code! <span style="color: #ed6d6b;">${userExists.confirmation}</span>`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({
              resend: true,
            });
          }
        });
      } else {
        return res.status(404).json('User does not exist :(');
      }
    } catch (error) {
      return next(setError(500, error.message || 'General error sending code'));
    }
  };

const registerUser = async (req, res, next) => {

    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        })

        const confirmation = confirmationCode()
        const { name, email, password, role, avatar } = req.body
        const userExists = await User.findOne({email: email })
        const finalAvatar = `https://api.dicebear.com/6.x/avataaars/svg?seed=${avatar}`
        if (!userExists) {
            const userToAdd = new User({ name, email, password, role, confirmation, avatar: finalAvatar })
            const userAdded = await userToAdd.save()

            const mailOptions = {
                from: 'Register',
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
            
                
                name: user.name,
                email,
                _id: user._id,
                role: user.role,
                active: user.active,
                avatar: user.avatar,
                token: token
            
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
        if(userToActivate.password)
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

const modifyPassword = async (req, res, next) => {

  // Modify password if logged
  try {
    const { password, newPassword } = req.body;

    const { _id } = req.user;
    if (bcrypt.compareSync(password, req.user.password)) {
      const newPasswordHash = bcrypt.hashSync(newPassword, 10);
      try {
        await User.findByIdAndUpdate(_id, { password: newPasswordHash });

        const updateUser = await User.findById(_id);

        if (bcrypt.compareSync(newPassword, updateUser.password)) {
          return res.status(200).json({
            updateUser: true,
          });
        } else {
          return res.status(404).json({
            updateUser: false,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      return res.status(404).json('Password did not match');
    }
  } catch (error) {
    return next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      // si existe el usuario, enviamos el email
      return res.redirect(307,
        `${process.env.PROTOCOL}/${process.env.HOST}:${process.env.PORT}${process.env.ENDPOINT}/user/sendpassword/${user._id}`
      );
    } else {
      // este usuario no esta en la base datos, le mandamos un 404 y le que no esta registrado
      return res.status(404).json({message:'User not registered'});
    }
  } catch (error) {
    return next(error);
  }

}

const changePassword = async (req, res, next) => {
  const {password, newPassword} = req.body
  const {id} = req.params
try {
  const user = await User.findById(id)
  if(user)
  {
    const oldPass = user.password
    if(bcrypt.compareSync(password,oldPass))
    {
        const userPassUpdated = await User.findByIdAndUpdate(id, {password: bcrypt.hashSync(newPassword, 10)})
        const userNewPass = await User.findById(id)

        if (bcrypt.compareSync(newPassword, userNewPass.password)) {
          return res.status(200).json({
            updatePass: true,
          });
        }
        else
        {
          return res.status(404).json('Password not updated')
        }
    }
    else  
    {
      return res.status(404).json('Password does not match. Please try again')
    }
  }
  else 
  {
    return res.status(404).json('User not found')
  }

}
catch (error)
{
    return next(error)
}

}

const sendPassword = async (req, res, next) => {

  try {
    const {id} = req.params
    const user = await User.findById(id)

    const email = process.env.EMAIL
    const password = process.env.PASSWORD_EMAIL

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password
      }
    })

    let passwordSecure = randomPassword()

    const mailOptions = {
      from: email,
      to: user.email,
      subject: 'Password recovery',
      html: `<h1>Recovery password</h1><h2>This is your new password! <span style="color: #ed6d6b;">${passwordSecure}</span><h2>If you didn't request this, please ignore this email.</h2>`,
    }

    transporter.sendMail(mailOptions, async function (error) {

      if(error)
        {
          return res.status(404).json('Mail not sent')
        }
        else 
        {
          const hashedPass = bcrypt.hashSync(passwordSecure, 10)

          try {
            const updatedUser = await User.findByIdAndUpdate(id, {password: hashedPass})
            const userNewPass = await User.findById(id)
            
            if (bcrypt.compareSync(passwordSecure, userNewPass.password)) {
              return res.status(200).json({
                updateUser: true,
                sendPass: true
              });
            }

          }
          catch(error)
          {
            return res.status(404).json('Password not updated')
          }
        }

    })
  }
  catch (error) {
    return next(error)
  }

}

const update = async (req, res, next) => {
  
  try {

    await User.syncIndexes();

    try {
      
      const updateUser = await User.findByIdAndUpdate(req.user?.id, {...req.body})

      const updateKeys = Object.keys(req.body);

      const testing = [];
      
      // updateKeys.forEach((item) => {
      //   if (updateUser[item] == req.body[item]) {
      //     testUpdate.push({
      //       [item]: true,
      //     });
      //   } else {
      //     testUpdate.push({
      //       [item]: false,
      //     });
      //   }
      // });

      return res.status(200).json('oki uwu');
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { 
    getAllUsers,
    getAllUsersPaginated,
    getUserById,
    activateUser,
    registerUser,
    update,
    deleteUser,
    loginUser,
    resendCode,
    modifyPassword,
    forgotPassword,
    sendPassword,
    changePassword
 }