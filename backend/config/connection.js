const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

mongoose.connect(`mongodb://127.0.0.1:27017/website`)
.then(()=>{
    console.log("Database connected successfully")
}).catch(()=>{
    console.log("Database could not connected")
})