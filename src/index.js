import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import accountRouter from "./routes/account.js";
import authRouter from "./routes/auth.js";
import authSessionRouter from "./routes/auth-session.js";
//import authTokenRouter from "./routes/auth-token.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use("/account", accountRouter);
app.use("/auth", authRouter);

app.use("/auth-session", authSessionRouter);
//app.use("/auth-token", authTokenRouter);

//Ruta principal
app.get("/", (req, res) => {
    res.status(200).send("Please Log in");
});

//Start server
app.listen(PORT, 
    () => console.log(`Running on http://localhost:${PORT}`
));