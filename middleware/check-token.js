const jwt = require('jsonwebtoken');
const secret = require('../config/auth');

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token,secret);
        next();
    }
    catch(err)
    {
        res.status(404).json({
            "message" : "Auth Failure"
        });
    }
}