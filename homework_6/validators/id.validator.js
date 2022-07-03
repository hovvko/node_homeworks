const Joi = require('joi');

module.exports = {
    userID: Joi.string().min(24).max(24)
};