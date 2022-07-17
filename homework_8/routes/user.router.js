const userRouter = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {config} = require('../configs');

userRouter.get('/',
    userController.getAll
);

userRouter.post('/',
    userMiddleware.isUserValidOnCreate,
    userMiddleware.isUserWithEmailExist,
    userController.create
);

userRouter.get('/:userID',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserWithIdExist,
    userController.getByID
);

userRouter.put('/:userID',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserValidOnUpdate,
    userMiddleware.isUserWithIdExist,
    userController.update
);

userRouter.delete('/:userID',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserWithIdExist,
    authMiddleware.checkAccessToken,
    userController.delete
);

module.exports = userRouter;