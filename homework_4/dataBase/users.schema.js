const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    }
}, {versionKey: false, timestamps: true});

module.exports = model('user', userSchema);