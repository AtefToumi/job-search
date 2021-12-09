import { action, makeAutoObservable } from "mobx";
import { AuthService } from "../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"
import IUser from "../types/user.type";


export class AuthStore {
  public authenticated = false;
  public userId: string = "";
  public userInfo: IUser | undefined;

  constructor(private readonly authService: AuthService) {
    makeAutoObservable(this);
    this.isAccessToken().then(action((result) => {
      this.authenticated = result;
    }));
    this.getUser().then(action((result) => {
      this.userInfo = result
    }))
  }

  async login(values: { email: string; password: string }) {
    try {
      const tokenPayloadDto = await this.authService.login(values);

      await AsyncStorage.setItem(
        "access_token",
        tokenPayloadDto.token
      );
      this.setAuthenticated(true);
    } catch (err) {
      this.setAuthenticated(false);
    }
  }

  async getUserId() {
    try {
      const storedToken = await AsyncStorage.getItem("access_token");
      if (storedToken) {
        const decodedData: IUser = jwt_decode(storedToken)
        console.log(decodedData._id)
        return decodedData._id
      }
    } catch (err) {
      return err
    }
  }
  async getUser() {
    try {
      const storedToken = await AsyncStorage.getItem("access_token");
      if (storedToken) {
        const userToken: IUser = jwt_decode(storedToken)
        const user = await this.authService.getUser(userToken._id)
        return user
      }
    }
    catch (err) {
      return err
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


  async isAccessToken() {
    try {
      const value = await AsyncStorage.getItem("access_token");
      return Promise.resolve(value !== null);
    } catch (error) {
      // Error retrieving data
      return Promise.resolve(false);
    }
  }
}
