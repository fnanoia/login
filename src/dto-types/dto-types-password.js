import { Type } from "@sinclair/typebox";

export const passwordDTOSchema = Type.String({
    format: "password",
    minLength: 10,
    maxLength: 25,
    errorMessage: {
        type: "Invalid password. Must be a string",
        format: "password Must include at least one Mayus, one Min, one Number",
        minLength: "password Must contain at least 10 characters",
        maxLength: "password Must contain maximum 25 characters"

    }
});