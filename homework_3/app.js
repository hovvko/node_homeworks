const express = require('express');
const {urlencoded} = require('express');

const userRoute = require('./routes/user.route');

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use('/users', userRoute);

app.listen(5000, () => {
    console.log('Server start on port 5000');
});