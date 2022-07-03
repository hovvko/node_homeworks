const {Schema, model} = require('mongoose');

const userScheme = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true, versionKey: false});

module.exports = model('user', userScheme);