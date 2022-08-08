import { Type } from "@sinclair/typebox";

export const surnameDTOSchema = Type.String({
    minLength: 4,
    maxLength: 40,
    errorMessage: {
        minLength: "surname Must contain at least 4 characters",
        maxLength: "surname Must contain maximum 40 characters"
    }
});