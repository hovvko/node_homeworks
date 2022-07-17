const Joi = require('joi');
const {nameValidator, ageValidator, emailValidator, passwordValidator} = require("./common.validator");

module.exports = {
    onCreate: Joi.object({
        name: nameValidator.required(),
        age: ageValidator,
        email: emailValidator.required(),
        password: passwordValidator.required()
    }),

    onID: Joi.string().length(24).trim(),

    onUpdate: Joi.object({
        name: nameValidator.required(),
        age: ageValidator
    })
};