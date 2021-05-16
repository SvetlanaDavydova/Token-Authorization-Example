const express = require("express");
const app = express();
const jwt = require ("jsonwebtoken");
const { getUserIdByToken, logoutUser } = require("../models/auth.model");
const axios = require('axios');


exports.logout = (req,res) => {
    let token = req.headers.authorization.split(' ')[1];
    let isFull = req.query.full;
    //console.log(token);
    getUserIdByToken(token)
        .then((user_id ) => {
            logoutUser(user_id, isFull, token)
            .then((results) => res.send(results))
            .catch((err) => res.send(err.message));
        })
        .catch((err) => res.send(err.message));
}

exports.getLatency = function(req,res){
    let date1= new Date();
    axios.get('https://google.com')
        .then(function (response) {
            let date2 = new Date();
            let latency = date2-date1;
            res.send({latency: latency});
        })
        .catch(function (error) {
            res.send(error.message);
        })
}
