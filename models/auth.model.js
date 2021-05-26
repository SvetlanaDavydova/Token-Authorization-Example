const {getConnection} = require("../config/dbconfig");
exports.saveToken = async function(user_id, token){
    const connection = await getConnection();
    const query = "INSERT INTO tokens VALUES (?,?)";
    const [rows,fields] = await connection.execute(query, [user_id, token]);
    return rows;
}

exports.getUserIdByToken = async function(token){
    const connection = await getConnection();
    const query = " SELECT user_id FROM tokens WHERE token = (?)";
    const [rows,fields] = await connection.execute(query, [token]);
    return rows.user_id;
}

exports.logoutUser = async function(user_id, full, token){
    const connection = await getConnection();

    if(full){
        const query = "DELETE FROM tokens WHERE user_id = (?)";
        const [rows, fields] = await connection.execute(query, [user_id]);
        return rows;
    } else {
        const query = "DELETE FROM tokens WHERE token = (?)";
        const [rows, fields] = await connection.execute(query, [token]);
        return rows;
    }
}