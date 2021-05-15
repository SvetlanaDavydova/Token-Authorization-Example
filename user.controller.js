const express = require("express");
const { signUp, login } = require("./user.model");
const app = express();
const jwt = require ("jsonwebtoken");



exports.userSignUp = (req,res) => {
    let { email, phone, password} = req.body;
    console.log(req.body);
    

    signUp(email, phone, password) 
        .then((insertId) => {
            let data = {
                user_id: insertId,
                email: email
            }
            let signature = "asdederftgyh";
            let expiration_ms = 300 ;
            let token = jwt.sign({data} , signature, {expiresIn: expiration_ms});
            res.send ( "Bearer " + token);
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
                    email: email
                }
                console.log(results.user_password);
                let signature = "asdederftgyh";
                let expiration_ms = 300 ;
                let token = jwt.sign({data}, signature, {expiresIn: expiration_ms});
                res.send ( "Bearer " + token);
            }else{
                res.status(400).send("unauthorized");
            }}
        )
        .catch((err) => {
            res.status(500).send(err.message)
        });
}