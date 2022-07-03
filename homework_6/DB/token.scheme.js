const {Schema, model} = require('mongoose');

const tokenScheme = new Schema({
    user: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
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