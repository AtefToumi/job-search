import http from "../api/client";
import IOfferData from "../types/offer.type"
import { API_URL } from '../utils/url'


export class OfferService {

    // async getAll() {
    //     const response = await http.get<Array<IOfferData>>("/offers");
    //     if (!response.data) {
    //         throw new Error(response.data)
    //     }
    //     //@ts-ignore
    //     return response.data.package.data;
    // }
    async getOffers() {
        const response = await fetch(`${API_URL}/offers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const parsedResponse = await response.json();
        console.log(parsedResponse)

        if (!response.ok) {
            throw new Error(parsedResponse);
        }

        return parsedResponse.package.data;
    }


    async getRecentOffers() {
        return http.get<Array<IOfferData>>("/recentoffers")
            .then((response) => {
                console.log(response.data)
            })
    }

}

