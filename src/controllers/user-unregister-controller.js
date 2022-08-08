import userModel from "../schemas/user-schema.js";
import bcryptjs from "bcryptjs";

export const userUnregisterController = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send();

    const user = await userModel.findById(id).exec();

    if(!user) return res.status(401).send("Credenciales incorrectas");

    const checkPassword = await bcryptjs.compare(password, user.password);
    
    if(!checkPassword) return res.status(401).send("Credenciales incorrectas");

    await user.remove();

    return res.send("User deleted succesfully");
};