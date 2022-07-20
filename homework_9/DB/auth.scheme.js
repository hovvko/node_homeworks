const {Schema, model} = require('mongoose');

const AuthScheme = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    },

    access_token: {
        type: String,
        required: true,
        trim: true
    },

    refresh_token: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true, versionKey: false});

module.exports = model('auth', AuthScheme);