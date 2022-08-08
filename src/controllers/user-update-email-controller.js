import userModel from "../schemas/user-schema.js";

export const userEmailController = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    if(!email) return res.status(400).send();

    const user = await userModel.findById(id).exec();

    if(!user) return res.status(401).send("Credenciales incorrectas");

    user.email = email;

    await user.save();

    return res.send("Update succesfully");
};