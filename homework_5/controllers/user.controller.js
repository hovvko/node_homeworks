const {User} = require('../base');
const {passwordService} = require('../services');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    getByID: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashedPassword = await passwordService.hashPassword(password);

            await User.create({...req.body, password: hashedPassword});

            res.json('User was created');
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {userID} = req.params;
            const {name} = req;

            await User.updateOne({_id: userID}, {name});

            res.json('User was updated');
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {userID} = req.params;

            await User.deleteOne({_id: userID});
            res.json('User was deleted');
        } catch (error) {
            next(error);
        }
    }
};