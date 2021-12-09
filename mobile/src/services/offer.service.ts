import http from "../api/client";
import IOfferData from "../types/offer.type"
import { API_URL } from '../utils/url'


export class OfferService {

    async getAll() {
        const response = await http.get<Array<IOfferData>>("/offers");
        if (!response.data) {
            throw new Error(response.data)
        }
        //@ts-ignore
        return response.data.package.data;
    }
    async getOffer(id: string) {
        const response =await http.get<IOfferData>(`/offers/:${id}`);
        if(!response.data) {
            throw new Error(response.data)
        }
        return response.data
    }

    async getRecentOffers() {
        return http.get<Array<IOfferData>>("/recentoffers")
            .then((response) => {
                console.log(response.data)
            })
    }

}

