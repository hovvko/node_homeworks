const fs = require('fs');

let users;
const usersPath = 'users.json';

fs.readFile(usersPath, (err, data) => {
    users = JSON.parse(data.toString());
});

const checker = (users, userID, res) => {
    if (isNaN(userID)) {
        return res.status(400).json(`${userID} is not number`);
    }

    if (userID > users.length) {
        return res.status(400).json(`Cannot find user by id - ${userID}`);
    }

    if (userID < 1) {
        return res.status(400).json('User id can not be smaller 1');
    }
}

const getAll = (req, res) => {
    res.send(users);
};

const getById = (req, res) => {
    const userID = +req.params['userID'];

    checker(users, userID, res);

    res.send(users[userID - 1]);
};

const create = (req, res) => {

    for (const user of users) {

        if (user['name'] === req.body['name']) {
            return res.status(400).json('Name must be a unique');
        }
    }

    users.push({name: req.body['name']});

    fs.writeFile(usersPath, JSON.stringify(users), err => {
        if (err) {
            return err;
        }
    });

    res.status(201).json('User has been created');
};

const update = (req, res) => {

    const userIndex = +req.params['userID'];

    checker(users, userIndex, res);

    users[userIndex - 1]['name'] = req.body['name'];
    res.status(200).json(`User updated`);
}

const deleteUser = (req, res) => {

    const userIndex = +req.params['userID'];

    checker(users, userIndex, res);

    users.splice(userIndex - 1, 1);

    fs.writeFile(usersPath, JSON.stringify(users), err => {
        if (err) {
            return err;
        }
    })

    res.status(200).json('User deleted');
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteUser
};