const {authService, emailService} = require('../services');
const {Auth} = require('../DB');
const {emailEnum} = require("../configs");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {_id, name} = req.userByEmail;

            await emailService.sendMail('bbbbrazzer@gmail.com', emailEnum.WELCOME, {userName: name});

            const tokens = authService.generateTokens();

            await Auth.create({
                userID: _id,
                ...tokens
            });

            res.json({
                user: req.userByEmail,
                ...tokens
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refresh_token, userID} = req.tokenInfo;

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
            const access_token = req.access_token;

            await Auth.deleteOne({access_token});

            await emailService.sendMail('bbbbrazzer@gmail.com', emailEnum.LOGOUT);

            res.json('User was logout');
        } catch (e) {
            next(e);
        }
    }
};