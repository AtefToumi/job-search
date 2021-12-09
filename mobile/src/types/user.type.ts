import IEducation from "./education.type";
import IExperience from "./experience.type";
import ISkill from "./skills.type";

export default interface IUser {
    _id: string,
    email: string,
    address: string,
    dateOfBirth: string,
    gender: string,
    name: string,
    title: string,
    bio: string,
    phone: string,
    image: string,
    experience: IExperience[]
    education: IEducation[]
    skills: ISkill[]
}
