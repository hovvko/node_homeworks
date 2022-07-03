const {idValidator, userValidator} = require('../validators');
const {CustomError} = require('../errors');
const {User} = require('../DB');

module.exports = {
    isUserIdValid: async (req, res, next) => {
        try {
            const {userID} = req.params;

            const {error} = idValidator.userID.validate(userID);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserWithIdExist: async (req, res, next) => {
        try {
            const {userID} = req.params;

            const user = await User.findOne({_id: userID});

            if (!user) {
                return next(new CustomError(`Cannot find user with id - ${userID}`));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailExist: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                return next(new CustomError(`User with email ${email} is exist`));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidOnCreate: async (req, res, next) => {
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

    isUserValidOnUpdate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.onUpdate.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.name = value;
            next();
        } catch (e) {
            next(e);
        }
    },
};