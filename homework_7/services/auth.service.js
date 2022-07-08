const jwt = require('jsonwebtoken');

const {CustomError} = require('../error');

module.exports = {
    generateTokens: (payload = {}) => {
        try {
            const access_token = jwt.sign(payload, process.env.ACCESS_SECRET_WORD, {expiresIn: '10m'});
            const refresh_token = jwt.sign(payload, process.env.REFRESH_SECRET_WORD, {expiresIn: '30d'})

            return {
                access_token,
                refresh_token
            };
        } catch (e) {
            throw new CustomError(e)
        }
    },

    checkToken: (token, secretWord) => {
        try {
            return jwt.verify(token, secretWord);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    }
};