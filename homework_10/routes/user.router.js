const userRouter = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware, filesMiddleware} = require('../middlewares');

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
    filesMiddleware.isAvatarValid,
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