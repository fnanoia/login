import { Type } from "@sinclair/typebox";

export const nameDTOSchema = Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
        minLength: "name Must contain at least 2 characters",
        maxLength: "name Must contain maximum 20 characters"
    }
});