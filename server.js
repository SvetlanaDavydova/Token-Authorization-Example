const express = require("express");
const { logout } = require("./controllers/auth.controller");
const { userSignUp, userLogIn, getInfo } = require("./controllers/user.controller");
const app = express();
const PORT = 3000;


app.use(express.json());
app.post("/signup", userSignUp);
app.post("/login", userLogIn);
app.get("/info", getInfo);
app.get("/logout", logout);


app.listen(PORT, () => console.log(" Сервер подключён на порту  " + PORT));

