import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";

const authRouter = Router();

//Publico
authRouter.get("/publico", (req, res) => {
    return res.send("Public endpoint");
});

//Autenticado para usuarios
authRouter.post("/autenticado", (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password) return res.sendStatus(400);

    const user = USERS_BBDD.find(user => user.email === email);

    if(!user) return res.sendStatus(401);
    if(user.password !== password) return res.sendStatus(401);

    return res.send(`Usuario ${user.name} autenticado`);
});

//Autorizado para admins
authRouter.post("/autorizado", (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password) return res.sendStatus(400);

    const user = USERS_BBDD.find(user => user.email === email);

    if(!user) return res.sendStatus(401);
    if(user.password !== password) return res.sendStatus(401);

    if(user.roles !== "admin") return res.sendStatus(403);

    return res.send(`Usuario administrador ${user.name}`);
});

export default authRouter;
