const {Schema, model} = require('mongoose');

const authScheme = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    },

    access_token: {
        type: String,
        required: true
    },

    refresh_token: {
        type: String,
        required: true
    }
}, {timestamps: true, versionKey: false});

module.exports = model('auth', authScheme);