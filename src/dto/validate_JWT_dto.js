import { jwtVerify } from "jose";

const JWTdto = async (req, res, next) => {

    const {authorization} = req.headers;

    if(!authorization) return res.status(401).send("Usuario no autorizado");

    const jwt = authorization.split(" ")[1];

    if(!jwt) return res.status(401).send("Usuario no autorizado");

    try{
        const encoder = new TextEncoder();
        //metodo jwtVerify de package jose, parametros: token a verificar, clave secreta.
        //spread del payload para obtener el id
        const { payload } = await jwtVerify(jwt, encoder.encode(process.env.JWT_PRIVATE_KEY));

        req.id = payload.id;

        next();

    }catch(err){
        return res.status(401).send("Usuario no autorizado");
    }
}

export default JWTdto;