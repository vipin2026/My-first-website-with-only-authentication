const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const Authenticator = require('../../src/middleware/Authenticator/authenticator')


router.post('/signup',Controller.signup),
router.post('/login',Controller.login),
router.post('/sentOtp',Controller.sentOtp)



module.exports = router;
