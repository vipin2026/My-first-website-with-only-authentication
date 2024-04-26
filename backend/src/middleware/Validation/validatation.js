const Joi = require('joi');

const joiValidation = (req,res,next)=>{

    const userSchema = Joi.object({
        name:Joi.string().required(),
        contact:Joi.string().required(),
        email:Joi.string().trim().lowercase().email().required(),
        password:Joi.string().trim().required()
    })



    const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };
    if(req.path == '/') var {error,value} = userSchema.validate(req.body,options);



if(error) {
    return res.json({status:false ,code: 400 , message:`${error.details.map(x => x.message.replace(/"/g, ''))[0]}`})
}else{req.body = value; next();}    // if there is no error then go on

}

module.exports = joiValidation;