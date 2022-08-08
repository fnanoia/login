import { Type } from "@sinclair/typebox";

export const emailDTOSchema = Type.String({
    format: "email",
    errorMessage: {
        type: "Invalid email",
        format: "email Must contain a valid string"
    }
});