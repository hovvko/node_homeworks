const {User} = require('../dataBase');

const getAll = async (req, res, next) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getByID = (req, res, next) => {
    try {
        const {user} = req;

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        await User.create({name, email, password});
        res.json(`User has be created`);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const {userID} = req.params;

        await User.updateOne({_id: userID}, {name, email, password});
        res.json('User was updated');
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const {userID} = req.params;

        await User.deleteOne({_id: userID});
        res.json('User was deleted');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getByID,
    createUser,
    updateUser,
    deleteUser
};