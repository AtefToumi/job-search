import client from "../api/client";
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
}
