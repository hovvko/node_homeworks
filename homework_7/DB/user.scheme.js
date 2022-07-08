const {Schema, model} = require('mongoose');

const userScheme = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
}, {timestamps: true, versionKey: false});

module.exports = model('user', userScheme);