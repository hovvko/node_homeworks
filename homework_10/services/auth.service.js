const jwt = require('jsonwebtoken');

const {config} = require('../configs');
const {CustomError} = require('../error');

module.exports = {
    generateTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, config.ACCESS_SECRET, {expiresIn: '10m'})
        const refresh_token = jwt.sign(payload, config.REFRESH_SECRET, {expiresIn: '30d'})

        return {
            access_token,
            refresh_token
        };
    },

    checkToken: (token, secretWord) => {
        try {
            return jwt.verify(token, secretWord);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    },

    generateActionToken: (payload = {}) => {
        return jwt.sign(payload, config.FORGOT_SECRET, {expiresIn: '7d'});
    }
};