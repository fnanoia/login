import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";
import { nanoid } from "nanoid";

const authSessionRouter = Router();

//Array para guardar las sesiones en memoria
const sessions = [];

//Login, email y password
authSessionRouter.post("/login", (req, res) => {
    
    //Spread del objeto con los datos
    const { email, password, id } = req.body;

    //Comprobaciones
    if(!email || !password) return res.sendStatus(400);

    //Busqueda en BBDD
    const user = USERS_BBDD.find(user => user.email === email);

    //Comporbaciones
    if(!user) return res.sendStatus(401);
    if(user.password !== password) return res.sendStatus(401);

    //Genero un sessionId
    const sessionId = nanoid();

    //Push al array de sesiones
    sessions.push({ sessionId, id });
    console.log(sessions);

    //Generar cookie. Nombre, valor, propiedades
    res.cookie('sessionId', sessionId, {
        httpOnly: true
    });

    return res.send();
});

//Solicitud autenticada con sesion para obtener el perfil del usuario de la BBDD
authSessionRouter.get("/profile", (req, res) => {
    //Spread del objeto con los datos
    const { cookies } = req;

    //Comprobaciones
    if(!cookies.sessionId) return res.sendStatus(401);

    //Busqueda en array
    const userSession = sessions.find(
        (session) => session.SessionId === cookies.SessionId
        );
        console.log(userSession);
    
    //Comprobaciones
    if(!userSession) return res.sendStatus(401);

    //Busqueda en BBDD del usuario por id
    const user = USERS_BBDD.find(user => user.id === userSession.id);

    //Comprobaciones
    if(!user) return res.sendStatus(401);

    //Borrar pwd de la sesion
    delete user.password
    
    return res.send(user)
});


export default authSessionRouter;