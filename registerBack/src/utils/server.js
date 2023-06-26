const express = require('express')
require('dotenv').config()

const server = express()
const router = express.Router()
const port = process.env.PORT || 3000
const endpoint = process.env.ENDPOINT || '/api/v1'

server.use(express.json())
server.use(endpoint, router)
server.listen(port, () => {

    console.log(`Gigger - Server running on port ${port}`)

})

module.exports = { server, router }