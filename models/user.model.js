
const {getConnection} = require("../config/dbconfig")

exports.signUp =  async function (email, phone, password){
    const connection =  await getConnection();
    const query = 'INSERT INTO `users` (`email`, `phone`, `user_password`) VALUES (?,?,?)';
    const [rows, fields] = await connection.execute(query, [email, phone, password]);
    return rows.insertId;
}

exports.login = async function(email){
    const connection =  await getConnection();
    const query = " SELECT * FROM users WHERE email = (?)";
    const [rows, fields] = await connection.execute(query, [email]);
    return rows;
}

exports.getUserInfo = async function(user_id){
    const connection =  await getConnection();
    const query = " SELECT * FROM users WHERE user_id = (?)";
    const [rows,fields] = await connection.execute(query, [user_id]);
    return rows;
}