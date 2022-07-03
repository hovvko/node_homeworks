const {userValidator} = require('../validators');
const {CustomError} = require('../error');
const {User} = require('../base');

module.exports = {
    isUserIdNormal: async (req, res, next) => {
        try {
            const {userID} = req.params;
            const {error, value} = userValidator.onID.validate(userID);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            const user = await User.findOne({_id: value});

            if (!user) {
                return next(new CustomError(`Cannot find user with id - ${userID}`), 404);
            }

            req.user = user;
            next();
        } catch (error) {
            next(error);
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
        } catch (error) {
            next(error);
        }
    },

    isUserUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                return next(new CustomError(`User with email ${email} is already exist`, 409));
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    isUserValidOnUpdate: (req, res, next) => {
        try {
            const {name} = req.body;
            const {error, value} = userValidator.onUpdate.validate(name);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.name = value;
            next();
        } catch (error) {
            next(error);
        }
    }
};