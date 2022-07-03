const express = require('express');
const mongoose = require('mongoose');

const {configs} = require('./configs');
const {urlencoded} = require('express');
const {userRouter} = require('./routes');

const app = express();

mongoose.connect(configs.MONGO_ULR);

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use('/users', userRouter);

app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .json({
            error: error.message || 'Unknown error',
            code: error.code || 500
        });
});

app.use('*', (req, res) => {
    res.status(404).json('Page not found');
});

app.listen(configs.PORT, () => {
    console.log(`Server has start ${configs.PORT}`)
});