const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users_db",
    password:"root"
})
connection.connect(function(err){
    if(err){
        return console.error("ошибка");
    } 
    console.log("подключено к базе данных");
})


exports.signUp = function(email, phone, password){   
    return new Promise((resolve,reject) => {
        connection.query("INSERT INTO `users` (`email`, `phone`, `user_password`) VALUES (?,?,?)", [email, phone, password],
        (err,results,fields) => {
            if(err) {
                reject (err);
            }
            resolve (results.insertId);
        })
    })
}

exports.login = function(email){
    return new Promise( (resolve,reject) => {
        connection.query(" SELECT * FROM users WHERE email = (?)", [email],
        (err, results, fields) => {
            if(err) reject (err);
            resolve( results[0]);
        })
    })
}