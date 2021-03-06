CREATE DATABASE users_db;
 USE users_db;
 CREATE TABLE users (
     user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     email  VARCHAR(60) NOT NULL,
     phone VARCHAR(20) NOT NULL,
     user_password VARCHAR (60) NOT NULL
 );



 if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  CREATE TABLE tokens (
    user_id INT NOT NULL,
    token TEXT NOT NULL,
    CONSTRAINT users_user_id_fk FOREIGN KEY (user_id)
    REFERENCES users (user_id)
  );