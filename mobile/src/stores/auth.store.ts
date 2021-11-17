import { LoginRequest } from './../dto/request/login-request.dto';
import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/auth.service";

export class AuthStore {
    private authenticated = false;

    constructor(private readonly authService: AuthService) {
        makeAutoObservable(this);
        this.authenticated = !!this.getAccessToken();
    }

    async login(values: { email: string, password: string }) {
        try {
            const tokenPayloadDto = await this.authService.login(values);
            localStorage.setItem("access_token", tokenPayloadDto.token);
            this.setAuthenticated(true);
        } catch (err) {
            this.setAuthenticated(false);
        }
    }

    private setAuthenticated(authenticated: boolean) {
        this.authenticated = authenticated;
    }
    getAccessToken() {
        return localStorage.getItem("access_token");
    }

    isAuthenticated() {
        return this.authenticated;
    }
}