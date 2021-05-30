const { signUp, login, getUserInfo } = require("../models/user.model");
const jwt = require ("jsonwebtoken");
const { saveToken, getUserIdByToken } = require("../models/auth.model");
const{JWTSECRET, JWTTIME} = require("../constants/common");


exports.userSignUp = async (req, res) => {
    try{
        let { email, phone, password} = req.body;
        let insertId = await signUp(email, phone, password);
        let data = {
            user_id: insertId,
            email: email
        };
        let token = jwt.sign({ data }, JWTSECRET, { expiresIn: JWTTIME });
        await saveToken(insertId, token);
        res.send( "Bearer " + token);
    } catch (err) {
        res.status(500).send(err.message);
    }
}  

exports.userLogIn = async (req, res) => { 
    try {
        let user = await login(req.body.email);
        if(!results.user_id) {
            throw new Error("User not found")
        }
        if (results.user_password == req.body.password){
            let data = {
                user_id: results.user_id,
                email: req.body.email
            }            
            let token = jwt.sign({data}, JWTSECRET, {expiresIn: JWTTIME});
            await saveToken(user.user_id, token);
            res.send("Bearer " + token);
        }
    } catch(err){
        res.status(400).send("unauthorized");
    }
}

exports.getInfo = async (req,res) => {
    try{
        let token = req.headers.authorization.split(' ')[1];
        let user_id = await getUserIdByToken(token);
        let results = await getUserInfo(user_id);
        res.send(results);
    } catch (err){
        res.send(err.message);
    }
}
