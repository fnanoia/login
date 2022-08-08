import userModel from "../schemas/user-schema.js";
import bcryptjs from "bcryptjs";

export const userPasswordController = async (req, res) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    if( !password || !newPassword ) return res.status(400).send();

    const user = await userModel.findById(id).exec();

    if(!user) return res.status(401).send("Credenciales incorrectas");

    const checkPassword = await bcryptjs.compare(password, user.password);
    
    if(!checkPassword) return res.status(401).send("Credenciales incorrectas");

    const hashedPassword = await bcryptjs.hash(newPassword, 8);

    user.password = hashedPassword;

    await user.save();

    return res.send("Update succesfully");
};