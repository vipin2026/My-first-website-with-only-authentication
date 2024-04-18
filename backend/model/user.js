const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    contact:{
        type:Number
        
    },
    email:{
        type:String,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    token:{
        type:String
        
    }
    // last_update:{type:Number , default:()=>Date.now()}

})
const userModel = mongoose.model('user',Schema)
module.exports = userModel