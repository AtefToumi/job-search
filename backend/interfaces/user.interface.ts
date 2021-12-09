import IExperience from "./experience.interface";

export interface IUser {
    _id: String;
    email: String;
    password: String;
    name: String;
    dateOfBirth: Date;
    gender: String;
    address: String;
    phone: String;
    image: String;
    title: String,
    bio: String,
    experience: IExperience[],
}
