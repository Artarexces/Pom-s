import { Document, model, Schema } from "mongoose";

//Interface de User

export interface IUser extends Document {
    username: string;
    password: string;
}

// Modelo de schema del usuario

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = model<IUser>("User", UserSchema);

export default User;
