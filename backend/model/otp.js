const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    to:{
        type: String,
        trim:true
    },
    otp:{
        type:Number
    }
}) 
const otpModel = mongoose.model('otp',Schema)
module.exports = otpModel