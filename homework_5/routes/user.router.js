const userRouter = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

userRouter.get('/',
    userController.getAll
);

userRouter.post('/',
    userMiddleware.isUserValidOnCreate,
    userMiddleware.isUserUniq,
    userController.create,
);

userRouter.put('/:userID',
    userMiddleware.isUserValidOnUpdate,
    userMiddleware.isUserIdNormal,
    userController.update
);

userRouter.get('/:userID',
    userMiddleware.isUserIdNormal,
    userController.getByID
);

userRouter.delete('/:userID',
    userMiddleware.isUserIdNormal,
    userController.delete
);

module.exports = userRouter;