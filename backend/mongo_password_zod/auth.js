const jwt = require('jsonwebtoken')
const JWT_SECRET = "s3cret"

function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).send("Token missing")
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next();
    }
    catch (err) {
        return res.status(403).send("Unathorized")
    }
}

module.exports = {
    auth, 
    JWT_SECRET
}