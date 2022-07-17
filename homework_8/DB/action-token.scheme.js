const {Schema, model} = require('mongoose');

const {emailEnum} = require('../enums');

const ActionTokenScheme = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    },

    action_token: {
        type: String,
        required: true
    },

    action_type: {
        type: String,
        enum: Object.values(emailEnum)
    }
}, {timestamps: true, versionKey: false});

module.exports = model('Action', ActionTokenScheme);