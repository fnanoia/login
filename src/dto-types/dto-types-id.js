import { Type } from "@sinclair/typebox";

export const idDTOSchema = Type.String({
    format: "uuid",
    errorMessage: {
        type: "Id must be a string",
        format: "Id Must match uuid"
    }
});







