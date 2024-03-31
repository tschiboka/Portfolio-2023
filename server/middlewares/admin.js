module.exports = function(req, res, next) {
    if (!req.user.isAdmin) return res.status(403).json({ success: false, message:'Forbidden: access denied!' });
    next();
}