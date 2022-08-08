import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/user-routes.js";

//import authRouter from "./routes/auth.js";
//import authSessionRouter from "./routes/auth-session.js";
//import authTokenRouter from "./routes/auth-token.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use("/user", userRoutes);


//app.use("/auth", authRouter);
//app.use("/auth-session", authSessionRouter);
//app.use("/auth-token", authTokenRouter);


//Ruta principal
app.get("/", (req, res) => {
    res.status(200).send("Please Log in");
});


//Async boot del server. Conexion a BBDD previa a que el server reciba peticiones
const bootServer = async () =>{

    //BBDD
    await mongoose.connect(process.env.MONGODB_URL);
    
    //Start server
    app.listen(PORT, 
        () => console.log(`Running on http://localhost:${PORT} \nConnected to MongoDB`
        ));
}

//Funcion para bootstraping
bootServer();