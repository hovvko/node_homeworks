const {authValidator} = require('../validators');
const {CustomError} = require('../error');
const {User, Auth} = require('../DB');
const {passwordService, authService} = require('../services');

module.exports = {
    isEmailAndPasswordValid: (req, res, next) => {
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

    isUserWithEmailExist: async (req, res, next) => {
        try {
            const {email} = req.loginData;

            const userByEmail = await User.findOne({email});

            if (!userByEmail) {
                return next(new CustomError('Password or email is not valid', 401));
            }

            req.userByEmail = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordValid: async (req, res, next) => {
        try {
            const {password} = req.loginData;
            const {password: hashedPassword} = req.userByEmail;

            const isPasswordSame = await passwordService.comparePassword(password, hashedPassword);

            if (!isPasswordSame) {
                return next(new CustomError('Password or email is not valid', 401));
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
                return next(new CustomError('No token', 401));
            }

            authService.checkToken(access_token, process.env.ACCESS_SECRET_WORD);

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

            authService.checkToken(refresh_token, process.env.REFRESH_SECRET_WORD);

            const tokenInfo = await Auth.findOne({refresh_token});

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    }
}