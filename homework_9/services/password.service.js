const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: (password, hashedPassword) => bcrypt.compare(password, hashedPassword)
};