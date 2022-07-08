const authRouter = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares');

authRouter.post('/login',
    authMiddleware.isEmailAndPasswordValid,
    authMiddleware.isUserWithEmailExist,
    authMiddleware.isPasswordValid,
    authController.login
);

authRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);

module.exports = authRouter;