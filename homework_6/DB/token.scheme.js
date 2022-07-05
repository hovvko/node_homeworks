const {Schema, model} = require('mongoose');

const tokenScheme = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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

module.exports = model('token', tokenScheme);