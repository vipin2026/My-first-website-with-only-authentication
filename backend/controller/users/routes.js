const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const Authenticator = require('../../src/middleware/Authenticator/authenticator')


router.post('/signup',Controller.signup),
router.post('/login',Controller.login),
router.post('/sentOtp',Controller.sentOtp),  //using mail
router.post('/verify_otp_email',Controller.verify_otp_email),
router.post('/sendOtp_Contact', Controller.sendOtp_Contact),
router.post('/verify_otp_contact',Controller.verify_otp_contact),



module.exports = router;
