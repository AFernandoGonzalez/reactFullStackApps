const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('../config/config')

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })
        if(!user) {
            return res.status(401).json({
                error: "User not found"
            })
        }
        if(!user.authenticate(req.body.password)) {
            return res.status(401).send({
                error: "Email and password don't match"
            })
        }

        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET)
        res.cookie("t", token, { expire: new Date() + 9999 })

        return res.json({
            token,
            user: { _id: user._id, name: user.name, email: user.email }
        })
    } catch (error) {
        return res.status(401).json({
            error: "Could not sign in"
        })
    }
}
const signout = async (req, res) => {
    res.clearCookie("t")
    return res.status(200).json({
        message: "Signed out"
    })
}
const requireSignin = (req, res, next) => {
    const token = req.headers.authorization; // Assuming the token is passed in the "Authorization" header

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // If verification succeeds, you can attach the decoded user information to the request object
        req.user = decoded;
        next();
    });
};

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if(!authorized) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next()
}

module.exports = { signin, signout, requireSignin, hasAuthorization }