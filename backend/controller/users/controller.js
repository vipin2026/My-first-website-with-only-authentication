let secretkey = process.env.SECRET_KEY
const JWT = require('jsonwebtoken')
const ARGON = require('argon2')
const commonFun = require('../../common/Function')


const userModel = require('../../model/user')
const otpModel = require('../../model/otp')




module.exports = {


    signup: async (req, res) => {
        try {
            let body = req.body
            console.log(body, "body")
            const checkContact = await userModel.findOne({ contact: body.contact })
            if (checkContact) { return res.status(201).send({ status: false, code: 201, message: "Contact already registered with us" }) }
            const checkMail = await userModel.findOne({ email: body.email })
            if (checkMail) { return res.status(201).send({ status: false, code: 201, message: "Email already registerd with us" }) }
            let hash = await ARGON.hash(body.password)
            body.password = hash
            const token = JWT.sign({ contact: body.contact }, secretkey)
            body.token = token
            const data = await userModel(body).save()
            const user = await userModel.findOne({ _id: data._id })
            delete user.password
            res.status(200).send({ status: true, code: 200, message: "SignUp successfully", result: user })
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    },

    login: async (req, res) => {
        try {
            let body = req.body
            console.log(body, "body")
            let user = await userModel.findOne({ email: body.email })
            if (!user) {
                return res.status(201).send({ status: false, code: 201, message: "user not found" })
            }
            let verify = await ARGON.verify(user.password, body.password)
            if (!verify) {
                res.status(201).send({ status: false, code: 201, message: "InCorrect Password" })
            }
            let token = JWT.sign({ contact: user.contact }, secretkey)
            let data = await userModel.findOneAndUpdate({ _id: user._id }, { token: token }, { new: true })
            delete data.password
            res.status(200).send({ status: true, code: 200, message: "Login Successfully", result: data })
        } catch (error) {
            console.log(error, "error")
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    },

    sentOtp: async (req, res) => {
        try {
            let body = req.body
            let otp = Math.floor(Math.random() * 1000)
            let user = await userModel.findOne({ email: body.email })
            if (!user) { return res.status(201).send({ status: false, code: 201, message: "user not found" }) }
            let htmlStr = `    
      <body>
      <h1>Dear ${user.name}</h1>
        <h1>Your OTP is: ${otp}</h1>
        <p>Please use this OTP to verify your account.</p>
      </body>`;
            let mail = body.email;
            let subject = `Your one time account verification code is ${otp}`;
            await commonFun.sendMail({ to: mail, subject: subject, html: htmlStr });
            await otpModel.deleteMany({ email: body.email })
            await otpModel.findOneAndUpdate({ email: body.email }, { $set: { otp: otp, email: body.email } }, { new: true, lean: true })
            let data = {
                otp: otp,
                email: body.email
            }
            let savedata = await otpModel(data).save()
            res.status(200).send({ status: true, code: 200, message: "otp send successfully", otp: otp, result: savedata })
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    },

    sendOtp_Contact: async (req, res) => {
        try {
            let body = req.body;
            console.log(body,"body")
            const checkUser = await userModel.findOne({ contact: body.contact })
            if (!checkUser) { return res.status(201).send({ status: false, code: 201, message: "Contact not registered" }) }
            const checkOtp = await otpModel.findOne({ contact: body.contact })
            let otp = Math.floor(Math.random() * 9000) + 1000;
            let obj  ={
                contact:body.contact,
                otp:otp
            }
            if(!checkOtp){
                const data = await otpModel(obj).save()
                console.log(data,"data")
                res.status(200).send({status: true, code:200, message:"OTP SENT SUCCESSFULLY", result:data})
            }else{
                const data = await otpModel.findOneAndUpdate({contact:body.contact},{$set:{otp:otp}},{new:true})
                console.log(data,"data")
                res.status(200).send({status: true , code: 200  , message:"OTP SENT SUCCESSFULLY" , result:data})
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    },

    verify_otp_email:async(req,res)=>{
        try {
            let body = req.body;
            console.log(body,"body")
            let verify = await otpModel.findOne({email:body.email, otp:body.otp})
            if(!verify){
                return res.status(201).send({status: false, code:201, message:"Invalid OTP"})
            }
            res.status(200).send({status: true , code: 200, message:"Account verified successfully"})
            await otpModel.findOneAndDelete({email:body.email})
        } catch (error) {
            console.log(error)
            res.status(500).send({status:false , code: 500, message:"ERROR"})
        }
    },

    verify_otp_contact:async(req,res)=>{
        try {
          let body = req.body;
          console.log(body,"body")
          let verify = await otpModel.findOne({contact:body.contact , otp:body.otp})
          if(!verify){
            return res.status(201).send({status: false, code: 201, message:"Invalid OTP"})
          }  
          res.status(200).send({status: true , code: 200 , message:"Account verified Successfullly"})
          await otpModel.findOneAndDelete({contact: body.contact})
        } catch (error) {
            console.log(error)
            res.status(500).send({status: false, code: 500 , messgae:"ERROR"})
        }
    }




}