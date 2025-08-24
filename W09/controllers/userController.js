const { users } = require('../data/data');
const bcrypt = require('bcrypt');

// Welcome.
exports.home = async (req, res, next) => {
    const user_id = req.signedCookies.user_id;
    // console.log(req.signedCookies);

    const user = users.find(u => u.id == user_id);
    const username = user?.username || '';
    res.json({ msg: `Welcome ${username}!` });
};

// Authenticate a user.
exports.authenticate = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username == username);
    const match = user?.password == password;
    //const match = await bcrypt.compare(password, user?.password);

    if (!user || !match) {
        res.json({ msg: 'Login failed!' });
        return;
    }

    res.cookie('user_id', user.id, { signed: true }).json({ msg: 'Login successfully.' });
};

// Authorize a user.
exports.authorize = (req, res, next) => {
    if (req.method === 'POST' && req.url === '/login') {
        next();
        return;
    }

    // Access control.
    if (!req.signedCookies.user_id) {
        res.json({ msg: 'You must login first to access this area.' });
        return;
    }

    next();
};