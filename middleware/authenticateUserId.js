function authenticateUserId(req, res, next) {
    const userId = req.params.userId;
    const authTokenUserId = req.user.userId;

    if (userId !== authTokenUserId.toString()) {
        return res.status(403).json({ message: 'Access forbidden. User IDs do not match.' });
    } else{
        next();
    }

}

module.exports = authenticateUserId;