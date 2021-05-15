const express = require("express");
const { userSignUp, userLogIn } = require("./user.controller");
const app = express();
const PORT = 3000;


app.use(express.json());
app.post("/signup", userSignUp);
app.post("/login", userLogIn);


app.listen(PORT, () => console.log(" Сервер подключён на порту  " + PORT));

