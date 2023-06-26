const {server,router} = require('./src/utils/server')
const mongoose = require('mongoose')
const {run,client} = require('./src/utils/db')
const express = require('express')
const routerUser = require('./src/api/routes/User.routes')

const endpoint = process.env.ENDPOINT || '/api/v1'

run()
server.use(express.json())
server.use(endpoint, router)
router.use('/user', routerUser)
router.get('/', (req, res) => {
    res.status(200).json({message: 'test'})

})