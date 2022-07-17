const {User} = require('../DB');
const {passwordService} = require("../services");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getByID: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            await User.createUserWithHashPassword(req.user);

            res.json('User was created');
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const {name, age} = req.dataOnUpdate;

            await User.updateOne({_id: req.userID}, {name, age});

            res.json('User was updated');
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            await User.deleteOne({_id: req.userID});

            res.json('User was deleted');
        } catch (e) {
            next(e);
        }
    }
}