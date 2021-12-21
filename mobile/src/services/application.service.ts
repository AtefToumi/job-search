import client from "../api/client";
import IUser from "../types/user.type";
import { API_URL } from '../utils/url'

export class ApplicationService {
    async apply(user_id: string, offer_id: string) {
        client.post(`/applications/add`, { user_id, offer_id }).then(response => console.log(response.data))
    }
}
