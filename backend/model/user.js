const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    contact:{
        type:String
        
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
        
    },
    profile_pic:{
        type:String,
        trim:true,
        default:""
    }
    // last_update:{type:Number , default:()=>Date.now()}

})
const userModel = mongoose.model('user',Schema)
module.exports = userModel