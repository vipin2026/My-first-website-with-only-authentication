const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    contact: {
        type: Number,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    otp: {
        type: Number
    }
})
const otpModel = mongoose.model('otp', Schema)
module.exports = otpModel