import { Router } from "express";
import validateRegisterDTO from "../dto/validate_register_dto.js";
import validateLoginDTO from "../dto/validate_login_dto.js";
import JWTdto from "../dto/validate_JWT_dto.js";
import { userRegisterController } from "../controllers/user-register-controller.js";
import { userLoginController } from "../controllers/user-login-controller.js";
import { userProfileController } from "../controllers/user-profile-controller.js";
import { userNameController } from "../controllers/user-update-name-controller.js";
import { userEmailController } from "../controllers/user-update-email-controller.js";
import { userPasswordController } from "../controllers/user-update-password-controller.js";
import { userUnregisterController } from "../controllers/user-unregister-controller.js";

const userRoutes = Router();

//MIddleware de la ruta
userRoutes.use((req, res, next) => {
    console.log(req.ip);

    next();
})


//Crear una cuenta
userRoutes.post("/register", validateRegisterDTO, userRegisterController);

//Ingresar a la cuenta
userRoutes.post("/login", validateLoginDTO, userLoginController);

//Ver una cuenta
userRoutes.get("/profile", JWTdto, userProfileController);

//Actualizar el nombre de una cuenta
userRoutes.patch("/update-name/:id", JWTdto, userNameController);

//Actualizar email de una cuenta
userRoutes.patch("/update-email/:id", JWTdto, userEmailController);

//Actualizar password
userRoutes.patch("/update-password/:id", JWTdto, userPasswordController);

//Eliminar una cuenta
userRoutes.delete("/unregister/:id", JWTdto, userUnregisterController);


export default userRoutes;