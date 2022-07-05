const {loginValidator} = require('../validators');
const {CustomError} = require('../errors');
const {User, Token} = require('../DB');
const {passwordService, tokenService} = require('../services');

module.exports = {
    isEmailAndPasswordValid: async (req, res, next) => {
        try {
            const {error, value} = loginValidator.onLogin.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.loginData = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserWithEmailExist: async (req, res, next) => {
        try {
            const {email} = req.loginData;

            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                return next(new CustomError('Email or password is not valid'));
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordProperly: async (req, res, next) => {
        try {
            const {password} = req.loginData;
            const {password: hashedPassword} = req.user;

            const isPasswordProperly = await passwordService.comparePassword(password, hashedPassword);

            if (!isPasswordProperly) {
                return next(new CustomError('Email or password is not valid'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                return next(new CustomError('Token not valid', 401));
            }

            tokenService.checkAccessToken(access_token);

            const tokenInfo = await Token.findOne({access_token}).populate('userID');

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.user = tokenInfo['userID'];
            req.access_token = access_token;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get('Authorization');

            if (!refresh_token) {
                return next(new CustomError('No token', 401));
            }

            tokenService.checkRefreshToken(refresh_token);

            const tokenInfo = await Token.findOne({refresh_token})

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    }
};