import userModel from "../schemas/user-schema.js";

export const userNameController = async (req, res) => {
    const { id } = req.params;
    const { name, surname } = req.body;

    if(!name) return res.status(400).send();

    const user = await userModel.findById(id).exec();

    if(!user) return res.status(401).send("Credenciales incorrectas");

    user.name = name;
    user.surname = surname;

    await user.save();

    return res.send("Update succesfully");
};
