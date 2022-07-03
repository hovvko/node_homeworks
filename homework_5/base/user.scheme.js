const {Schema, model} = require('mongoose');

const UserScheme = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    }
}, {versionKey: false, timestamps: true});

module.exports = model('User', UserScheme);