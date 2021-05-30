const express = require("express");
const{checkTokenMiddleware} = require("./middlewares/tokenmiddleware");
const { logout, getLatency } = require("./controllers/auth.controller");
const { userSignUp, userLogIn, getInfo } = require("./controllers/user.controller");
const app = express();
const PORT = 3000;


app.use(express.json());

app.post("/signup", userSignUp);
app.post("/login", userLogIn);
app.get("/info", checkTokenMiddleware, getInfo);
app.get("/logout", checkTokenMiddleware, logout);
app.get("/latency", checkTokenMiddleware, getLatency);




app.listen(PORT, () => console.log(" Сервер подключён на порту  " + PORT));

