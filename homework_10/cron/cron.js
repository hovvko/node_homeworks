const cron = require('node-cron');
const dayjs = require('dayjs');

const {Auth} = require('../DB');

module.exports = {
    deleteOldAuthTokens: () => cron.schedule('0 0 1 * *', async () => {
        const oneMonthBeforeNow = dayjs().subtract(1, 'month');

        await Auth.deleteMany({
            createdAt: {$lte: oneMonthBeforeNow}
        }, {new: true});
    })
};