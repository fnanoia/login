import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { idDTOSchema } from "../dto-types/dto-types-id.js";
import { nameDTOSchema } from "../dto-types/dto-types-name.js";
import { surnameDTOSchema } from "../dto-types/dto-types-surname.js";
import { emailDTOSchema } from "../dto-types/dto-types-email.js";
import { passwordDTOSchema } from "../dto-types/dto-types-password.js";

const registerDTOSchema = Type.Object(
    {
        id: idDTOSchema,
        name: nameDTOSchema,
        surname: surnameDTOSchema,
        email: emailDTOSchema,
        password: passwordDTOSchema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "Incorrect object format"
        }
    }
);

//Instancio objeto ajv. los add son por el uso de sinclair/typebox
const ajv = new Ajv({ allErrors: true });

//Customizar formatos y errores. Lo instancio en la clase ajv para usarlo como metodos en el Schema
//agregar el formato custom para password. agregar regex
ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ["email", "uuid"]).addKeyword("kind").addKeyword("modifier");
addErrors(ajv);

//Metodo compile de ajv. uso el Schema de parametro
const validate = ajv.compile(registerDTOSchema);

//Middleware. uso next para que siga la ejecucion del codigo despues de efectuar la funcion
const validateRegisterDTO = (req, res, next) => {
    
    //Metodo validate de ajv. verifico si el objeto que me mandan en el body request, cumple con el Schema
    const isDTOValid = validate(req.body);

    //Customizando errores
    if(!isDTOValid) res.status(400).send(ajv.errorsText(validate.errors, {separator: "\n"}));

    next();
};

export default validateRegisterDTO;