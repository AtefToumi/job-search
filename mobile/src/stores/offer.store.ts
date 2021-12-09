import { action, makeAutoObservable } from "mobx";
import { OfferService } from "../services/offer.service";
import IOfferData from "../types/offer.type";

export class OfferStore {
  public recentOffers: IOfferData[] = [];

  constructor(private readonly offerService: OfferService) {
    makeAutoObservable(this);
    this.getOffers().then(action((result) => {
      this.recentOffers = result
    }))
  }

  async getOffers() {
    try {
      const offers = await this.offerService.getAll();
      return offers;
    }
    catch (err) {
      console.log(err)
    }
  }

  async getOffer(id: string) {
    try {
      const offer = await this.offerService.getOffer(id)
    }
    catch (err) {
      console.log(err)
    }
  }


}
