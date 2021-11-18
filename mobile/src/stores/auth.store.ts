import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/auth.service";
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthStore {
    private authenticated = false;

    constructor(private readonly authService: AuthService) {
        makeAutoObservable(this);
        this.authenticated = !!this.getAccessToken();
    }

    async login(values: { email: string, password: string }) {
        try {
            const tokenPayloadDto = await this.authService.login(values);
            AsyncStorage.setItem("access_token", tokenPayloadDto.token);
            this.setAuthenticated(true);
        } catch (err) {
            this.setAuthenticated(false);
        }
    }

    private setAuthenticated(authenticated: boolean) {
        this.authenticated = authenticated;
    }
    getAccessToken() {
        return AsyncStorage.getItem("access_token");
    }

    isAuthenticated() {
        return this.authenticated;
    }
}