const Joi = require('joi');

const {userRegex} = require('../configs');

module.exports = {
    nameValidator: Joi.string().min(2).max(100).trim(),
    ageValidator: Joi.number().integer().min(1).max(150),
    emailValidator: Joi.string().pattern(userRegex.EMAIL_REGEX),
    passwordValidator: Joi.string().pattern(userRegex.PASSWORD_REGEX)
};