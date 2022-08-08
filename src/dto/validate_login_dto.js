import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { emailDTOSchema } from "../dto-types/dto-types-email.js";
import { passwordDTOSchema } from "../dto-types/dto-types-password.js";

//Schema del objeto con la libreria sinclair/typebox. Custom errores y formatos con ajv-format y ajv-errors
const loginDTOSchema = Type.Object(
    {
        email: emailDTOSchema,
        password: passwordDTOSchema
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
ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
//Customizar formatos y errores. Lo instancio en la clase ajv para usarlo como metodos en el Schema
addFormats(ajv, ["email"]).addKeyword("kind").addKeyword("modifier");
addErrors(ajv);


//Metodo compile de ajv. uso el Schema de parametro
const validate = ajv.compile(loginDTOSchema);

//Middleware. uso next para que siga la ejecucion del codigo despues de efectuar la funcion
const validateLoginDTO = (req, res, next) =>{
    
    //Metodo validate de ajv. verifico si el objeto que me mandan en el body request, cumple con el Schema
    const isDTOValid = validate(req.body);

    //Customizando errores
    if(!isDTOValid) res.status(400).send(ajv.errorsText(validate.errors, {separator: "\n"}));

    next();
};

export default validateLoginDTO;