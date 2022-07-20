const {authService, emailService, passwordService} = require('../services');
const {Auth, Action, User} = require("../DB");
const {emailEnum} = require("../enums");
const {emailTemplate} = require("../email-templates");

module.exports = {
    login: async (req, res, next) => {
        try {
            const tokens = authService.generateTokens();

            await Auth.create({
                userID: req.user['_id'],
                ...tokens
            });

            await emailService.sendMail(emailEnum.WELCOME, {userName: req.user['name']});

            res.json({
                ...tokens,
                user: req.user
            })
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {userID, refresh_token} = req.tokenInfo;

            await Auth.deleteOne({refresh_token});

            const tokens = authService.generateTokens();

            await Auth.create({
                userID,
                ...tokens
            });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            await Auth.deleteOne({access_token: req.access_token});

            res.json('User was logout');
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {_id} = req.userByEmail;

            const action_token = authService.generateActionToken();

            await Action.create({
                userID: _id,
                action_token,
                action_type: emailEnum.FORGOT_PASSWORD
            });

            await emailService.sendMail(emailEnum.FORGOT_PASSWORD, {
                frontURL: 'google.com/',
                token: action_token
            });

            res.json('Mail was send');
        } catch (e) {
            next(e);
        }
    },

    setForgotPassword: async (req, res, next) => {
        try {
            const {userID, action_token} = req.tokenInfo;

            await Action.deleteOne({action_token});

            await User.updateUserWithHashPassword(userID, req.password);

            res.json('Password was changed');
        } catch (e) {
            next(e);
        }
    }
};