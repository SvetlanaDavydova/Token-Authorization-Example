const{JWTSECRET} = require("../constants/common")
const jwt = require ("jsonwebtoken");

function checkTokenMiddleware(req,res,next){
    let token = '';
    try {
        token = req.headers.authorization.split(' ')[1];
    } catch (error) {
        return res.status(401).send("unauthorized");
    }   
    jwt.verify(token, JWTSECRET, (err,user) => {
        if(err){
            return res.status(401).send("token is expired");
        }
        req.user = user;
        next();
    });
}

exports.checkTokenMiddleware = checkTokenMiddleware;