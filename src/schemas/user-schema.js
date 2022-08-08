import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    _id: {
        type: String    
        },
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
        },
    surname: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 40
        },
    email: {
        type: String,
        required: true,
        unique: true
        },
    password: {
        type: String,
        required: true
        },
});

const userModel = model("User", userSchema);

export default userModel;