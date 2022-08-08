import userModel from "../schemas/user-schema.js";

export const userProfileController =  async (req, res) => {
    const { id } = req;
    const user = await userModel.findById(id).exec();

    if(!user) return res.status(401).send("Credenciales incorrectas");

    const { name, surname, email } = user;

    return res.send({ id, name, surname, email });
};