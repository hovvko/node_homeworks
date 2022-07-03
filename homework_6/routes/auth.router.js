const authRouter = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares');

authRouter.post('/login',
    authMiddleware.isEmailAndPasswordValid,
    authMiddleware.isUserWithEmailExist,
    authMiddleware.isPasswordProperly,
    authController.login
);

authRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

module.exports = authRouter;