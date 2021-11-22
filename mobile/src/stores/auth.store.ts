import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthStore {
  public authenticated = false;

  constructor(private readonly authService: AuthService) {
    makeAutoObservable(this);
    this.getAccessToken().then((result) => {
      this.authenticated = result;
    });
  }

  async login(values: { email: string; password: string }) {
    try {
      //   const tokenPayloadDto = await this.authService.login(values);
      await AsyncStorage.setItem(
        "access_token",
        `eyJhbGciOiJIUZI1NiIsInR5CCI6IkpXVCJ9.
      eyJzdWIiOiIxMjMONTY3ODkwIiwibmFtZSI6IkpvaG4
      GRG9lIiwiaXNTb2NpYWwionRydWv9.
      4pcPyMDO901PSyXnrXCjTwXyr4Bsezd11AVTmud2fU4`
      );
      this.setAuthenticated(true);
    } catch (err) {
      this.setAuthenticated(false);
    }
  }

  async logout() {
    try {
      await AsyncStorage.removeItem("access_token");
      this.setAuthenticated(false);
    } catch (err) {
      this.setAuthenticated(false);
    }
  }

  private setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  async getAccessToken() {
    try {
      const value = await AsyncStorage.getItem("access_token");
      return Promise.resolve(value !== null);
    } catch (error) {
      // Error retrieving data
      return Promise.resolve(false);
    }
  }

  //   isAuthenticated() {
  //     return this.authenticated;
  //   }
}
