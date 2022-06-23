const userRouter = require('express').Router();

const {userController} = require('../controllers')
const {userMiddleware} = require('../middlewares');

userRouter.get('/',
    userController.getAll);

userRouter.post('/',
    userMiddleware.isUserNameValid,
    userMiddleware.isUserEmailValid,
    userMiddleware.isUserPasswordValid,
    userController.createUser);

userRouter.get('/:userID',
    userMiddleware.isUserIdNormal,
    userController.getByID);

userRouter.put('/:userID',
    userMiddleware.isUserNameValid,
    userMiddleware.isUserEmailValid,
    userMiddleware.isUserPasswordValid,
    userMiddleware.isUserIdNormal,
    userController.updateUser);

userRouter.delete('/:userID',
    userMiddleware.isUserIdNormal,
    userController.deleteUser);

module.exports = userRouter;