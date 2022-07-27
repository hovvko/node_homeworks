const {CustomError} = require('../error');
const {config} = require('../configs');

module.exports = {
    isAvatarValid: async (req, res, next) => {
        try {
            if (!req.files?.avatar) {
                return next();
            }

            const {mimetype, size} = req.files.avatar;

            if (size > config.MAX_IMAGE_SIZE) {
                return next(new CustomError('Max file size 3MB'));
            }

            if (!config.IMAGE_MIMETYPE.includes(mimetype)) {
                return next(new CustomError('Wrong file type'));
            }

            next();
        } catch (e) {
            next(e)
        }
    }
};