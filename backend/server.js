const express = require('express')
const app = express();
const cors = require('cors')

require('./config/connection')
require('dotenv').config();

const PORT = process.env.PORT
const userRoute = require('./controller/users/routes')

app.use(express.json());
app.use(cors())
app.use('/user/v1',userRoute)




app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})