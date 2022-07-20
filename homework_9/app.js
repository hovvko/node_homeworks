require('dotenv').config();
const express = require('express');
const {urlencoded} = require('express');
const mongoose = require('mongoose');
const expressFileUploader = require('express-fileupload');

const {config} = require('./configs');
const {userRouter, authRouter} = require('./routes');

const app = express();

mongoose.connect(config.MONGO_ULR);

app.use(expressFileUploader());
app.use(express.json());
app.use(urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Page not found');
});

app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .json(error.message || 'Unknown error')
});

app.listen(config.PORT, () => {
    console.log(`Server has start on port ${config.PORT}`);
});