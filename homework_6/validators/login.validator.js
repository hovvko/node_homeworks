const Joi = require('joi');

const {emailValidator, passwordValidator} = require('./commonUser.validator');

module.exports = {
    onLogin: Joi.object({
        email: emailValidator.required(),
        password: passwordValidator.required()
    })
};