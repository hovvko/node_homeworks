module.exports = {
    PORT: process.env.PORT,
    MONGO_ULR: process.env.MONGO_URL,

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'acc',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'ref',
    FORGOT_SECRET: process.env.FORGOT_ACTION_SECRET || 'fp',

    EMAIL: process.env.EMAIL,
    EMAIL_PASS: process.env.EMAIL_PASS
};