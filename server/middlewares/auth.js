const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ success: false, message: 'Access denied: no JWT token is provided!'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        const expired = decoded.exp <= Date.now();
        if (expired) return res.status(401).json({ success: false, message: 'Token expired!' })

        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ success: false, message: 'Invalid token!', error: ex});
    }
}