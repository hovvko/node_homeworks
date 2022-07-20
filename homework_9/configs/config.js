module.exports = {
    PORT: process.env.PORT,
    MONGO_ULR: process.env.MONGO_URL,

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'acc',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'ref',
    FORGOT_SECRET: process.env.FORGOT_ACTION_SECRET || 'fp',

    EMAIL: process.env.EMAIL,
    EMAIL_PASS: process.env.EMAIL_PASS,

    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,

    MAX_IMAGE_SIZE: 3 * 1024 * 1024,
    IMAGE_MIMETYPE: [
        'image/gif',
        'image/jpeg',
        'image/png'
    ]
};