const {model, Schema} = require('mongoose');
const {passwordService} = require("../services");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    age: {
        type: Number,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String
    }

}, {timestamps: true, versionKey: false});

UserSchema.static({
    createUserWithHashPassword: async function (user) {
        const hashedPassword = await passwordService.hashPassword(user.password);

        return this.create({...user, password: hashedPassword});
    },

    updateUserWithHashPassword: async function (userID, password) {
        const hashedPassword = await passwordService.hashPassword(password);

        return this.updateOne({_id: userID}, {password: hashedPassword});
    }
});

module.exports = model('User', UserSchema);