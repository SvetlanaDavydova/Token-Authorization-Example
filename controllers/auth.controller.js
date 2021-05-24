const { getUserIdByToken, logoutUser } = require("../models/auth.model");
const axios = require('axios');


exports.logout = async (req,res) => {
    let token = req.headers.authorization.split(' ')[1];
    let isFull = req.query.full;

    try{
        let user_id = await getUserIdByToken(token);
        await logoutUser(user_id, isFull, token);
        res.status(200).send();
    } catch(err){
        res.status(500).send(err.message);
    }
}

exports.getLatency = async function(req,res){
    try{
        let date1= new Date();
        let response = await axios.get('https://google.com');
        let date2 = new Date();
        let latency = date2-date1;
        res.send({latency: latency});
    } catch(err){
        res.status(500).send(err.message);
    }    
}
