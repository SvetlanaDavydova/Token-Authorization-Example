const mysql = require('mysql2/promise');

const obj = {
    host: "localhost",
    user: "root",
    database: "users_db",
    password:"root"
};

exports.getConnection= async function(){
    return await mysql.createConnection(obj);
};
