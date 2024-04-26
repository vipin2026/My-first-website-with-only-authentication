const userModel = require('../../../model/user');
const JWT = require('jsonwebtoken');
let secretkey = process.env.SECRET_KEY;

const authenticator = async (req, res, next) => {
    let tokenStr = req.headers['token'] || req.query['token'] || req.body.token;
    console.log(tokenStr,"token arha hai")
    if (!tokenStr) return res.status(203).send({ status: false, code: 203, message: "token is required" });
    let user = await userModel.findOne({ token: tokenStr });
    if (!user) return res.status(203).send({ status: false, code: 203, message:"user not found" })
    // if (user.blockedbyAdmin) return res.send({ status: false, code: 205, message: messages.SUSPENDED_BY_ADMIN })
    if (tokenStr == user.token) {
    JWT.verify(tokenStr, secretkey, async (err, result) => {
        if (err) return res.status(203).send({ status: false, code: 203, message: "ERROR WHILE AUTHENTICATION"})
        else {
            req.result = user;
            next();
        }
    })
}
}


module.exports = authenticator