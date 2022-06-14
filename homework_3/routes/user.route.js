const userRouter = require('express').Router();

const userController = require('../controllers/user.controller');

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.create);
userRouter.get('/:userID', userController.getById);
userRouter.put('/:userID', userController.update);
userRouter.delete('/:userID', userController.deleteUser);

module.exports = userRouter;