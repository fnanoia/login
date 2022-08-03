import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";

const accountRouter = Router();

//MIddleware de la ruta
accountRouter.use((req, res, next) => {
    console.log(req.ip);

    next();
})

//Ver una cuenta
accountRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = USERS_BBDD.find(user => user.id === id);

    if(!user) return res.status(404).send();

    return res.send(user);
});

//Ver todas las cuentas
accountRouter.get("/", (req, res) => {
   
    if(USERS_BBDD.length === 0) return res.status(404).send();
    
    return res.send(USERS_BBDD);
});

//Crear una cuenta
accountRouter.post("/", (req, res) => {
    const { id, name, email, password, roles } = req.body;

    if( !id || !name || !email || !password || !roles ) return res.state(400).send();

    const user = USERS_BBDD.find(user => user.id === id);

    if(user) return res.status(409).send();

    USERS_BBDD.push({
        id, name, email, password, roles
    });

    return res.send();
});


//Actualizar el nombre de una cuenta
accountRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if(!name) return res.state(400).send();

    const user = USERS_BBDD.find(user => user.id === id);

    if(!user) return res.status(404).send();

    user.name = name;

    return res.send();
});


//Eliminar una cuenta
accountRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const userIndex = USERS_BBDD.find(user => user.id === id);

    if(userIndex === -1) return res.status(404).send();

    USERS_BBDD.splice(userIndex, 1);

    return res.send();
});


export default accountRouter;