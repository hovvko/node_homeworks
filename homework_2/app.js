const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

const pathToUsers = path.join(__dirname, 'users.json');

(async () => {
    const buffer = await fs.readFile(pathToUsers);

    let users = JSON.parse(buffer.toString());

    const checking = (res, userID) => {

        if (isNaN(userID)) {
            res.status(400);
            return res.send(`Endpoint is not number`);
        }

        if (userID > users.length) {
            res.status(400);
            return res.send(`Cannot find user ${userID}`);
        }

        if (userID < 0) {
            res.status(400);
            return res.send('User id must be more than 0');
        }
    };

    app.get('/users', (req, res) => {

        res.send(users);
    });

    app.get('/users/:userID', (req, res) => {

        const userID = +req.params['userID'];

        const checked = checking(res, userID);

        if (checked) {
            return checked;
        }

        res.send(users[userID - 1]);
    });

    app.get('/users/create/:name', async (req, res) => {

        const name = req.params['name'];

        for (const user of users) {
            if (name === user.name) {
                return res.send(`User with name ${name} already exists`);
            }
        }

        users.push({name});
        const usersStringify = JSON.stringify(users);

        await fs.writeFile(pathToUsers, usersStringify);

        return res.send(`Users ${name} was created`);
    });

    app.get('/users/update/:userID/:name', (req, res) => {

        const {userID, name} = req.params;

        const checked = checking(res, userID);

        if (checked) {
            return checked;
        }

        users[userID - 1] = {name: name};
        res.send(`User ${users[userID - 1]} was updated`);
    });

    app.get('/users/:userID/delete', async (req, res) => {

        const userID = +req.params['userID'];

        const checked = checking(res, userID);

        if (checked) {
            return checked;
        }

        users.splice(userID - 1, 1);

        const usersStringify = JSON.stringify(users);

        await fs.writeFile(pathToUsers, usersStringify);
        res.send(`User ${userID} has been delete`);
    });

    app.listen(5000, () => {

        console.log('Server has start on port: 5000');
    });

})();
