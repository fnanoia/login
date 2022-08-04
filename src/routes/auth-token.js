import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";
import { SignJWT, jwtVerify } from "jose";

const authTokenRouter = Router();

//Login, email y password
authTokenRouter.post("/login", async (req, res) => {
    
    //Spread del objeto con los datos
    const { email, password } = req.body;

    //Comprobaciones
    if(!email || !password) return res.sendStatus(400);

    //Busqueda en BBDD
    const user = USERS_BBDD.find(user => user.email === email);

    //Comporbaciones
    if(!user) return res.sendStatus(401);
    if(user.password !== password) return res.sendStatus(401);

    //Spread del usuario, obtengo el id
    const { id } = user;

    //Generar token. el payload lleva el id del user. 
    const jwtConstructor = new SignJWT({ id });
    
    //Constructor nativo TextEncoder. la firma del token va en formato Uint8Array
    const encoder = new TextEncoder();

    //Construccion del token. header(formato). fecha creacion. fecha expiracion. firma privada(AWAIT)
    const jwt = await jwtConstructor
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));


    return res.send({jwt});
});

//Solicitud autenticada con token para obtener el perfil del usuario de la BBDD
authTokenRouter.get("/profile", async (req, res) => {

    //Obtener token de header y comprobar autenticidad y caducidad
    const {authorization} = req.headers;

    if(!authorization) return res.sendStatus(401);

    try{
        const encoder = new TextEncoder();
        //metodo jwtVerify de package jose, parametros: token a verificar, clave secreta.
        //spread del payload para obtener el id
        const { payload } = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY));

        //Busqueda en BBDD del usuario por id
        const user = USERS_BBDD.find(user => user.id === payload.id);
    
        //Comprobaciones
        if(!user) return res.sendStatus(401);
    
        //Borrar pwd de la sesion
        delete user.password;

        return res.send(user)

    }catch(err){
        return res.sendStatus(401)
    }
    
});


export default authTokenRouter;