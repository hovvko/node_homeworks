const {User} = require('../DB');
const {passwordService} = require('../services');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const {password} = req.body;

            const hashedPassword = await passwordService.hashPassword(password);

            await User.create({...req.body, password: hashedPassword});

            res.json('User was created');
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const {userID} = req.params;
            const {name} = req.name;

            await User.updateOne({_id: userID}, {name});

            res.json('User was updated');
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {userID} = req.params;

            await User.deleteOne({_id: userID});

            res.json(`User with id - ${userID} was deleted`);
        } catch (e) {
            next(e);
        }
    }
};