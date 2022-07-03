const {tokenService} = require('../services');
const {Token} = require('../DB');

module.exports = {
    login: async (req, res, next) => {
        try {
            const tokens = tokenService.getTokens();

            await Token.create({
                user: req.userByEmail,
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
            const {user, refresh_token} = req.tokenInfo;

            await Token.deleteOne({refresh_token});

            const tokens = tokenService.getTokens();

            await Token.create({
                user,
                ...tokens
            });

            res.json({
                user,
                ...tokens
            });
        } catch (e) {
            next(e);
        }
    }
};