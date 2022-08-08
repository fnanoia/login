import userModel from "../schemas/user-schema.js";
import bcryptjs from "bcryptjs";
import { SignJWT } from "jose"

export const userLoginController = async (req, res) => {
    const {email, password } = req.body;
    
    if( !email || !password ) return res.status(400).send();
    
    const userEmail = await userModel.findOne({email}).exec();
    
    if(!userEmail) return res.status(401).send("Credenciales incorrectas");
    
    const checkPassword = await bcryptjs.compare(password, userEmail.password);

    if(!checkPassword) return res.status(401).send("Credenciales incorrectas");

    //Generar token. el payload lleva el id del user. 
    const jwtConstructor = new SignJWT({ id:userEmail.id });
    
    //Constructor nativo TextEncoder. la firma del token va en formato Uint8Array
    const encoder = new TextEncoder();

    //Construccion del token. header(formato). fecha creacion. fecha expiracion. firma privada(AWAIT)
    const jwt = await jwtConstructor
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));


    return res.send({jwt});
};