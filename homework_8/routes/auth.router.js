const authRouter = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');

authRouter.post('/login',
    authMiddleware.isLoginDataValid,
    authMiddleware.isEmailAndPasswordValid,
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

authRouter.post('/forgot/password',
    authMiddleware.isEmailOnForgotPasswordValid,
    authController.forgotPassword
);

authRouter.post('/set/forgot/password',
    authMiddleware.isForgotPasswordValid,
    authMiddleware.isActionTokenValid,
    authController.setForgotPassword
)

module.exports = authRouter;