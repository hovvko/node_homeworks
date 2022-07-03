const express = require('express');
const mongoose = require('mongoose');
const {urlencoded} = require('express');

const {config} = require('./configs');
const {userRouter, authRouter} = require('./routes');

const app = express();

mongoose.connect(config.MONGO_ULR);

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Page not found');
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500
        });
});

app.listen(config.PORT, () => {
    console.log(`Server has start on port ${config.PORT}`);
});