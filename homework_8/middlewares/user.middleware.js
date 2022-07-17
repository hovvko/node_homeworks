const {userValidator} = require('../validators');
const {CustomError} = require('../error');
const {User} = require('../DB');

module.exports = {
    isUserIdValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.onID.validate(req.params['userID']);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.userID = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserWithIdExist: async (req, res, next) => {
        try {
            const user = await User.findOne({_id: req.userID});

            if (!user) {
                return next(new CustomError(`Cannot find user with id - ${req.userID}`));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidOnCreate: (req, res, next) => {
        try {
            const {error, value} = userValidator.onCreate.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserWithEmailExist: async (req, res, next) => {
        try {
            const {email} = req.user;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                return next(new CustomError(`User with email - ${email} is exist`));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidOnUpdate: (req, res, next) => {
        try {
            const {error, value} = userValidator.onUpdate.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.dataOnUpdate = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};