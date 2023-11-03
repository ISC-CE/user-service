const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Retrieve the token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); // if there isn't any token
    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // token is no longer valid
        req.user = user;
        next(); // pass the execution off to whatever request the client intended
    });
}

module.exports = authenticateToken;
