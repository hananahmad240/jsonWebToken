const Joi = require('@hapi/joi');
// validation schema for register


const registerValidation = (data) => {
    const schemaRegister = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schemaRegister.validate(data);
}


const loginValidation = (data) => {
    const schemaLogin = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schemaLogin.validate(data);
}



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;