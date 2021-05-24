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

exports.saveToken = async function(user_id, token){
    return new Promise((resolve,reject) => {
        connection.query("INSERT INTO tokens VALUES (?,?)", [user_id, token],
        (err,results,fields) => {
            if(err) {
                reject (err);
            }
            resolve (results);
        })
    })
}
exports.getUserIdByToken = async function(token){
    console.log(token);
    return new Promise( (resolve,reject) => {
        connection.query(" SELECT user_id FROM tokens WHERE token = (?)", [token],
        (err, results, fields) => {
            if(err) reject (err.message);
            resolve( results[0].user_id);
            
        })
    })
}

exports.logoutUser = async function(user_id, full, token){
    return new Promise( (resolve,reject) => {
         if(full){
             console.log(user_id);
            connection.query(" DELETE FROM tokens WHERE user_id = (?)", [user_id],
            (err, results, fields) => {
                if(err) reject (err.message);
                resolve( results);
                
            })
        } else {
            connection.query(" DELETE * FROM tokens WHERE token = (?)", [token],
            (err, results, fields) => {
                if(err) reject (err.message);
                resolve( results);
                
            })
        }
    })
}