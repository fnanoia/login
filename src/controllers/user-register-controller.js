import userModel from "../schemas/user-schema.js";
import bcryptjs from "bcryptjs";

export const userRegisterController = async (req, res) => {
    const { id , name, surname, email, password } = req.body;
    
    if( !id || !name || !surname || !email || !password ) return res.status(400).send();
    
    const userId = await userModel.findById(id).exec(); 
    if(userId) return res.status(409).send("El usuario ya se encuentra registrado");

    const userEmail = await userModel.findOne({email}).exec(); 
    if(userEmail) return res.status(409).send("El Email ya se encuentra registrado");

    const hashedPassword = await bcryptjs.hash(password, 8);
    
    const newUser = new userModel({
        _id: id,
        name,
        surname, 
        email, 
        password: hashedPassword
    });
    
    await newUser.save();

    return res.send("Usuario registrado");
};