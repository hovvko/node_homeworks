const {User} = require('../dataBase');
const {CustomError} = require('../error');

module.exports = {
    isUserIdNormal: async (req, res, next) => {
        try {
            const {userID} = req.params;

            if (userID.length !== 24) {
                return next(new CustomError('Length user id is not 24'));
            }

            const user = await User.findOne({_id: userID});

            if (!user) {
                return next(new CustomError(`Wrong id - ${userID}`));
            }

            req.user = await User.findOne({_id: userID});
            next();
        } catch (error) {
            next(error);
        }
    },

    isUserNameValid: (req, res, next) => {
        try {
            const {name, email, password} = req.body;

            if (!req.route.methods.put) {

                if (!name) {
                    return next(new CustomError('Name is not provided'));
                }

                if (name.length < 2) {
                    return next(new CustomError('Name cannot be less than 2 symbols'));
                }

                if (name.length > 50) {
                    return next(new CustomError('Name cannot be more than 50 symbols'));
                }
            }

            if (!name && !email && !password) {
                return next(new CustomError('Must to provide though 1 field, name or email or password'));
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    isUserEmailValid: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!req.route.methods.put) {

                if (!email) {
                    return next(new CustomError('Email is not provide'));
                }

                if (!email.includes('@') || !email.includes('.com')) {
                    return next(new CustomError('Email field dont have @ or .com'));
                }

                if (email.length < 8 && email.length > 50) {
                    return next(new CustomError('Email length is not correct'));
                }

                const isUniqueEmail = await User.findOne({email: email.toLowerCase()});

                if (isUniqueEmail) {
                    return next(new CustomError(`User with ${email} is exist`, 409));
                }
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    isUserPasswordValid: (req, res, next) => {
        try {
            const {password} = req.body;

            if (!req.route.methods.put) {

                if (!password) {
                    return next(new CustomError('Password is not provided'));
                }

                if (password.length < 5 || password.length > 100) {
                    return next(new CustomError('Password length is not correct'));
                }
            }

            next();
        } catch (error) {
            next(error);
        }
    },
};
