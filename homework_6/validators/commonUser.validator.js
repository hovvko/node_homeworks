const Joi = require('joi');

const {userRegex} = require('../configs');

module.exports = {
    nameValidator: Joi.string().min(2).max(100).trim(),
    emailValidator: Joi.string().pattern(userRegex.EMAIL_REGEX).lowercase().trim(),
    passwordValidator: Joi.string().pattern(userRegex.PASSWORD_REGEX)
};