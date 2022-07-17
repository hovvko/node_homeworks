const {emailEnum} = require('../enums');

module.exports = {
    [emailEnum.WELCOME]: {
        subject: 'Welcome to platform',
        template: 'welcome'
    },

    [emailEnum.FORGOT_PASSWORD]: {
        subject: 'Forgot password',
        template: 'forgot-password'
    }
};