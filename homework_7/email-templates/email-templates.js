const {emailEnum} = require("../configs");

module.exports = {
    [emailEnum.WELCOME]: {
        subject: 'Welcome to platform',
        template: 'welcome'
    },

    [emailEnum.REGISTRATION]: {
        subject: 'Thank u for registration',
        template: 'registration'
    },

    [emailEnum.LOGOUT]: {
        subject: 'Logout',
        template: 'logout'
    }
};