const {tokenService} = require('../services');
const {Token} = require('../DB');

module.exports = {
    login: async (req, res, next) => {
        try {
            const tokens = tokenService.getTokens();

            await Token.create({
                userID: req.user['_id'],
                ...tokens
            });

            res.json({
                user: req.user,
                ...tokens
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {userID} = req.tokenInfo;

            await Token.deleteOne({userID});

            const tokens = tokenService.getTokens();

            await Token.create({
                userID,
                ...tokens
            });

            res.json({
                userID,
                ...tokens
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            await Token.deleteOne({access_token: req.access_token});

            res.json('User was logout');
        } catch (e) {
            next(e);
        }
    }
};