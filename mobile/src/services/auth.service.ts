import client from "../api/client";
import IUser from "../types/user.type";
import { API_URL } from '../utils/url'

export class AuthService {
    async login(values: { email: string, password: string }) {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        const parsedResponse = await response.json();

        if (!response.ok) {
            throw new Error(parsedResponse);
        }

        return parsedResponse;
    }
    // async getUser(id: string) {
    //     const response = await fetch(`${API_URL}/users/${id}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(id),
    //     });
    //     const parsedResponse = await response.json();

    //     if (!response.ok) {
    //         throw new Error(parsedResponse);
    //     }
    //     console.log(parsedResponse)

    //     return parsedResponse;
    // }

    async getUser(id: string) {
        const response = await client.get<IUser>(`/users/${id}`)
        if (!response.data) {
            throw new Error(response.data)
        }

        //@ts-ignore
        return response.data.package.data
    }
}
