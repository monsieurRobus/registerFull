const express = require('express')
const router = express.Router()
const { getUserById, registerUser, activateUser, deleteUser, getAllUsers, loginUser, resendCode, forgotPassword,sendPassword, changePassword } = require('../controller/User.controller')

router.get('/:id', getUserById)
router.get('/', getAllUsers)
router.patch('/activate', activateUser)
router.post('/resend', resendCode)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/:id', deleteUser)
router.post('/forgotpassword/send', forgotPassword)
router.post('/sendpassword/:id', sendPassword);
router.post('/changePassword/:id', changePassword);

module.exports = router