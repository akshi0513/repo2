const jwt = require('jsonwebtoken'); // npm install jsonwebtoken
const User = require('../models/userModel');

const secretKey = "hello"


const protect = async (req, res, next) => {
    let token;

    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))    {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secretKey)
            req.user = decoded;
            next();

        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }
    if (!token) {
        res.status(401).json({
            message: 'Token is invalid or expired'
        })
    }
}

// create a middlware to authorise access to apis based on the roles of users
const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role == role)  {
            next();
        } else { // this means that the user has a role which isnt allowed to access this api
            return res.status(403).json({
                message: 'This user is not authorised to call this specific API'
            })
        }
    }
}

module.exports = { protect, authorize }

