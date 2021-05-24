const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users_db",
    password:"root"
});
connection.connect(function(err){
    if(err){
        return console.log(err.message);
    } 
    console.log("подключено к базе данных");
});


exports.signUp = async function(email, phone, password){   
    return new Promise((resolve,reject) => {
        connection.query("INSERT INTO `users` (`email`, `phone`, `user_password`) VALUES (?,?,?)", [email, phone, password],
        (err,results,fields) => {
            if(err) {
                reject (err.message);
            }
            resolve (results.insertId);
        })
    })
}

exports.login = async function(email){
    return new Promise( (resolve,reject) => {
        connection.query(" SELECT * FROM users WHERE email = (?)", [email],
        (err, results, fields) => {
            if(err) reject (err.message);
            resolve( results[0]);
        })
    })
}

exports.getUserInfo = async function(user_id){
    return new Promise( (resolve,reject) => {
        connection.query(" SELECT * FROM users WHERE user_id = (?)", [user_id],
        (err, results, fields) => {
            if(err) reject (err.message);
            resolve( results[0]);
        })
    })
}