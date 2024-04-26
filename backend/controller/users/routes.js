const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const joiValidation = require('../../src/middleware/Validation/validatation')
const authenticator = require('../../src/middleware/Authenticator/authenticator')
const upload = require('../../src/middleware/Multer/multer')


router.post('/signup',Controller.signup),
router.post('/login',Controller.login),
router.post('/sentOtp',Controller.sentOtp),  //using mail
router.post('/verify_otp_email',Controller.verify_otp_email),
router.post('/sendOtp_Contact', Controller.sendOtp_Contact),
router.post('/verify_otp_contact',Controller.verify_otp_contact),
router.post('/upload_profilePic',authenticator,upload.single('profile_pic'),Controller.upload_profilePic),



//GET APIs
router.get('/get_user',authenticator,Controller.get_user),
router.get('/get_profile',authenticator,Controller.get_profile),
router.get('/get_user_list',authenticator,Controller.get_user_list),




module.exports = router;
