const express = require("express");
const { logout, getLatency } = require("./controllers/auth.controller");
const { userSignUp, userLogIn, getInfo } = require("./controllers/user.controller");
const app = express();
const PORT = 3000;


app.use(express.json());
app.post("/signup", userSignUp);
app.post("/login", userLogIn);
app.get("/info", getInfo);
app.get("/logout", logout);
app.get("/latency", getLatency);
//на данный момент не настроен CORS и не сделано обновление token.


app.listen(PORT, () => console.log(" Сервер подключён на порту  " + PORT));

