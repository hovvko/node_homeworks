const Joi = require('joi');

const {nameValidator, emailValidator, passwordValidator} = require('./commonUser.validator');

module.exports = {
    onCreate: Joi.object({
        name: nameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required()
    }),

    onUpdate: nameValidator.required(),

    onID: Joi.string().alphanum().min(24).max(24).lowercase().trim()
};