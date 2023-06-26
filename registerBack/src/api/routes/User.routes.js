const express = require('express')
const router = express.Router()
const { getUserById, registerUser, activateUser, deleteUser, getAllUsers } = require('../controller/User.controller')

router.get('/:id', getUserById)
router.get('/', getAllUsers)
router.patch('/activate', activateUser)
router.post('/register', registerUser)
router.delete('/:id', deleteUser)

module.exports = router