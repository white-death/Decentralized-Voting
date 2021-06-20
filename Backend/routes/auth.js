const express = require('express')
const authRouter = express.Router()

const {register} = require('../controller/AuthController')

authRouter.post('/register', register)
// authRouter.post('/login', AuthController.login)

module.exports = authRouter


