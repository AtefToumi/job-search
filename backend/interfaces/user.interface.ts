import { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    // name: string;
    // dateOfBirth: Date;
    // gender: String;
    // address: String;
    // phone: String;
}
