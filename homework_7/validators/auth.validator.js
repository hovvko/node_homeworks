const Joi = require('joi');

const {emailValidator, passwordValidator} = require('./common.validator');

module.exports = {
    onLogin: Joi.object({
        email: emailValidator.required(),
        password: passwordValidator.required()
    })
};