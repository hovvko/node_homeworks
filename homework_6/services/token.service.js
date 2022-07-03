const jwt = require('jsonwebtoken');

const {CustomError} = require('../errors');
const {secretWord} = require('../configs');

module.exports = {
    getTokens: (payload = {}) => {
        try {
            const access_token = jwt.sign(payload, secretWord.ACCESS_SECRET_WORD, {expiresIn: '10m'});
            const refresh_token = jwt.sign(payload, secretWord.REFRESH_SECRET_WORD, {expiresIn: '30d'});

            return {
                access_token,
                refresh_token
            };
        } catch (e) {
            throw new CustomError(e);
        }
    },

    checkAccessToken: (token = '') => {
        try {
            return jwt.verify(token, secretWord.ACCESS_SECRET_WORD);
        } catch (e) {
            throw new CustomError('Token not validdddd', 401);
        }
    },

    checkRefreshToken: (token = '') => {
        try {
            return jwt.verify(token, secretWord.REFRESH_SECRET_WORD);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    }
}