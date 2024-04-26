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
            body.contact = '+91' + body.contact;
            const data = await userModel(body).save()
            const user = await userModel.findOne({ _id: data._id })
            delete user.password

            res.status(200).send({ status: true, code: 200, message: "SignUp successfully", result: user })

            let htmlStr = `    
            <body>
            <h1>Dear ${user.name}</h1>
              <h1>Thanks for being part of our family</h1>
              <p>You have successfully created your account.</p>
              <p>Your login email id = ${user.email}</p>
            </body>`;
            let mail = user.email;
            let subject = `Thanks for Applying as a maid  ${user.name}`;
            await commonFun.sendMail({ to: mail, subject: subject, html: htmlStr });
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    },

    login: async (req, res) => {
        try {
            let body = req.body;
            console.log(body, "body")
            let user = await userModel.findOne({ email: body.email });
            if (!user) {
                return res.status(201).send({ status: false, code: 201, message: "User not found" });
            }
            let verify = await ARGON.verify(user.password, body.password);
            if (!verify) {
                return res.status(201).send({ status: false, code: 201, message: "Incorrect Password" });
            }
            let token = JWT.sign({ contact: user.contact }, secretkey);
            let data = await userModel.findOneAndUpdate({ _id: user._id }, { token: token }, { new: true });
            delete data.password;
            res.status(200).send({ status: true, code: 200, message: "Login Successfully", result: data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: false, message: "Internal Server Error" });
        }
    },


    sentOtp: async (req, res) => {
        try {
            let body = req.body
            console.log(body, "shshsh")
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
            let subject = `Your one time code is ${otp}`;
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
            console.log(body, "body")
            let number = '+91' + body.contact;
            console.log(number, "number")
            const checkUser = await userModel.findOne({ contact: number })
            if (!checkUser) { return res.status(201).send({ status: false, code: 201, message: "Contact not registered" }) }
            const checkOtp = await otpModel.findOne({ contact: number })
            let otp = Math.floor(Math.random() * 9000) + 1000;
            let obj1 = `
Dear ${checkUser.name}
Your OTP is: ${otp}
Please use this OTP to verify your account.
`
            await commonFun.sentOtp({ phoneNumber: number, body: obj1 });
            let obj = {
                contact: number,
                otp: otp
            }
            if (!checkOtp) {
                const data = await otpModel(obj).save()
                console.log(data, "data")
                res.status(200).send({ status: true, code: 200, message: "OTP SENT SUCCESSFULLY", result: data })
            } else {
                const data = await otpModel.findOneAndUpdate({ contact: number }, { $set: { otp: otp } }, { new: true })
                console.log(data, "data")
                res.status(200).send({ status: true, code: 200, message: "OTP SENT SUCCESSFULLY", result: data })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    },

    verify_otp_email: async (req, res) => {
        try {
            let body = req.body;
            console.log(body, "body")
            let verify = await otpModel.findOne({ email: body.email, otp: body.otp })
            if (!verify) {
                return res.status(201).send({ status: false, code: 201, message: "Invalid OTP" })
            }
            res.status(200).send({ status: true, code: 200, message: "Account verified successfully" })
            await otpModel.findOneAndDelete({ email: body.email })
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    },

    verify_otp_contact: async (req, res) => {
        try {
            let body = req.body;
            console.log(body, "body")
            let number = '+91' + body.contact
            let verify = await otpModel.findOne({ contact: number, otp: body.otp })
            if (!verify) {
                return res.status(201).send({ status: false, code: 201, message: "Invalid OTP" })
            }
            res.status(200).send({ status: true, code: 200, message: "Account verified Successfullly" })
            await otpModel.findOneAndDelete({ contact: number })
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: false, code: 500, messgae: "ERROR" })
        }
    },
    upload_profilePic: async (req, res) => {
        try {

            const profilePic = req.file.filename;
            console.log(profilePic, "profile_pic")
            console.log(req.result, " user detrails")
            const user = await userModel.findOneAndUpdate({ _id: req.result.id }, { $set: { profile_pic: profilePic } }, { new: true })
            if (!user) return res.status(201).send({ status: false, code: 201, message: "Getting error while uploading profile pic" })
            res.status(200).send({ status: false, code: 200, message: "Profile  Update successfully", result: user })

        } catch (error) {
            console.log(error)
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    },


    get_user: async (req, res) => {
        try {
            console.log(req.result, " user details arhi hai kya ")
            const user = await userModel.findOne({ _id: req.result.id })
            res.status(200).send({ status: true, code: 200, message: "USER FOUND", result: user })
        } catch (error) {
            console.log(err)
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    },

    get_profile: async (req, res) => {
        try {
            const user = await userModel.findOne({ _id: req.result.id }).lean()
            delete user.password
            if (user.profile_pic !== "" && user.profile_pic !== "blank_pic.png") {
                user.profile_pic = `${process.env.Local_URL}:${process.env.PORT}/uploads/${user.profile_pic}`
                console.log(user.profile_pic, "profile_pic")
                res.status(200).send({ status: true, code: 200, message: "Profile loaded successfully", result: user })
            } else {
                user.profile_pic = `${process.env.LOCAL_URL}:${process.env.PORT}/uploads/blank_pic.png`
                console.log(user.profile_pic, "profile_pic")
                res.status(200).send({ status: true, code: 200, message: messages.PROFILE_UPDATED, result: user });
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    },

    get_user_list: async (req, res) => {
        try {
            console.log(req.result)
            let users = await userModel.find({})
            console.log(users.length)
            let data = [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].profile_pic !== "") {
                    data.push(users[i]);
                }
            }
            console.log(...data,"yaha arha hai ")
            if (!users) return res.status(201).send({ status: 201, code: 201, message: "failed to fetching data" })
            // console.log(users,"all user data")
            res.status(200).send({ status: true, code: 200, message: "List of all Users", result: users })
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: false, code: 500, message: "ERROR" })
        }
    }





}