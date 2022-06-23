const express = require('express');
const mongoose = require('mongoose');

const {configs} = require('./configs');
const {userRouter} = require('./routes');
const {urlencoded} = require("express");

mongoose.connect(configs.MONGO_ULR);

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));

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

app.listen(configs.PORT, () => {
    console.log(`Server has start on port ${configs.PORT}`);
});