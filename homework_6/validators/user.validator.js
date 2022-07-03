const Joi = require('joi');

const {nameValidator, emailValidator, passwordValidator} = require('./commonUser.validator');

module.exports = {
    onCreate: Joi.object({
        name: nameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required()
    }),

    onUpdate: Joi.object({
        name: nameValidator.required()
    })
};