module.exports = (usersList) => {
    let express = require('express');
    let router = express.Router();

    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');

    router.post('/', (req, res) => {
        // TODO: Implement user account creation
        res.status(501).json({msg: "POST new user not implemented"});
    });

    router.put('/', (req, res) => {
        // TODO: Implement user update (change password, etc).
        res.status(501).json({msg: "PUT update user not implemented"});
    });

    router.post('/authenticate', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            let msg = "Username or password missing!";
            console.error(msg);
            res.status(401).json({msg: msg});
            return;
        }

        const user = usersList.find((user) => user.username === username);
        if (user) {
            console.log("USER INFO: " + user)

            bcrypt.compare(password, user.hash, (err, result) => {
                if (result) {
                    const payload = {
                        username: username,
                        admin: false
                    };
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                    res.json({
                        msg: 'User authenticated successfully',
                        token: token
                    });
                }
                else res.status(401).json({msg: "Password mismatch!"})
            });
        } else {
            res.status(404).json({msg: "User not found!"});
        }
    });

    return router;
};