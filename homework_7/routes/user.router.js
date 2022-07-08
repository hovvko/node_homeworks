const userRouter = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');

userRouter.get('/',
    userController.getAll
);

userRouter.post('/',
    userMiddleware.isUserValidOnCreate,
    userMiddleware.isEmailUnique,
    userController.create
);

userRouter.get('/:userID',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserWithIdExist,
    userController.getById
);

userRouter.put('/:userID',
    userMiddleware.isUserValidOnUpdate,
    userMiddleware.isUserIdValid,
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