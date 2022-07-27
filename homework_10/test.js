const dayjs = require('dayjs');

const oneMonthBeforeNow = dayjs().subtract(7, 'day');

console.log(oneMonthBeforeNow.toString())