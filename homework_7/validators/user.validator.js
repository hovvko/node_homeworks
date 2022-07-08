const Joi = require('joi');

const {nameValidator, emailValidator, passwordValidator} = require('./common.validator');

module.exports = {
    onUserID: Joi.string().min(24).max(24),

    onCreate: Joi.object({
        name: nameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required()
    }),

    onUpdate: nameValidator.required()
};