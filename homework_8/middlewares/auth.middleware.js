const {authValidator} = require('../validators');
const {CustomError} = require('../error');
const {User, Auth, Action} = require('../DB');
const {passwordService, authService} = require("../services");
const {object} = require("joi");
const {config} = require("../configs");

module.exports = {
    isLoginDataValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.onLogin.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.loginData = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailAndPasswordValid: async (req, res, next) => {
        try {
            const {email, password} = req.loginData;

            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                return next(new CustomError('Wrong email or password', 401));
            }

            const isPasswordSame = await passwordService.comparePassword(password, userByEmail.password);

            if (!isPasswordSame) {
                return next(new CustomError('Wrong email or password', 401));
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                return next(new CustomError('No token', 401));
            }

            authService.checkToken(access_token, config.ACCESS_SECRET);

            const isToken = await Auth.findOne({access_token});

            if (!isToken) {
                return next(new CustomError('Token not valid', 401));
            }

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

            authService.checkToken(refresh_token, config.REFRESH_SECRET);

            const tokenInfo = await Auth.findOne({refresh_token});

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailOnForgotPasswordValid: async (req, res, next) => {
        try {
            const {email} = req.body;

            const {error} = authValidator.onEmail.validate(email);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                return next(new CustomError('Wrong email'));
            }

            req.userByEmail = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    isForgotPasswordValid: (req, res, next) => {
        try {
            const {password} = req.body;

            const {error, value} = authValidator.onPassword.validate(password);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.password = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isActionTokenValid: async (req, res, next) => {
        try {
            const action_token = req.get('Authorization');

            if (!action_token) {
                return next(new CustomError('No token'));
            }

            const tokenInfo = await Action.findOne({action_token});

            if (!tokenInfo) {
                return next(new CustomError('Token not valid'));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    }
};