const express = require("express");
const { signUp, login, getUserInfo } = require("../models/user.model");
const app = express();
const jwt = require ("jsonwebtoken");
const { saveToken, getUserIdByToken } = require("../models/auth.model");



exports.userSignUp = (req,res) => {
    let { email, phone, password} = req.body; 

    signUp(email, phone, password) 
        .then((insertId) => {
            let data = {
                user_id: insertId,
                email: email
            }
            let signature = "asdederftgyh";
            let expiration_ms = 300 ;
            let token = jwt.sign({data} , signature, {expiresIn: expiration_ms});
            saveToken(insertId, token)
                .then((results) => {                
                    res.send ( "Bearer " + token);
                })
                .catch((err) => res.send(err.message));
        })
        .catch((err) => res.status(500).send("Error!"));
}


exports.userLogIn = (req,res) => { 

    login(req.body.email)
        .then((results) => {  
            if(!results.user_id) {
                throw new Error("User not found")
            } else if (results.user_password == req.body.password){
                let data = {
                    user_id: results.user_id,
                    email: req.body.email
                }
                
                let signature = "asdederftgyh";
                let expiration_ms = 300 ;
                let token = jwt.sign({data}, signature, {expiresIn: expiration_ms});
                saveToken(results.user_id, token)
                .then((results) => {                
                    res.send ( "Bearer " + token);
                })
                .catch((err) => res.send(err.message));
            
            }else{
                res.status(400).send("unauthorized");
            }}
        )
        .catch((err) => {
            res.status(500).send(err.message)
        });
}

exports.getInfo = (req,res) => {
    let token = req.headers.authorization.split(' ')[1];
    //console.log(token);
    getUserIdByToken(token)
        .then((user_id) => {
            getUserInfo(user_id)
            .then((results) => res.send(results))
            .catch((err) => res.send(err.message));
        })
        .catch((err) => res.send(err.message));
}

