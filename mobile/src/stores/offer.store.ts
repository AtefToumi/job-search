import { action, makeAutoObservable } from "mobx";
import { OfferService } from "../services/offer.service";
import IOfferData from "../types/offer.type";

export class OfferStore {
  public recentOffers: IOfferData[] = [];

  constructor(private readonly offerService: OfferService) {
    makeAutoObservable(this);
    this.getOffers().then(action((result) => {
      console.log(result)
      this.recentOffers = result
    }))
  }

  async getOffers() {
    try {
      const offers = await this.offerService.getOffers();
      return offers;
    }
    catch (err) {
      console.log(err)
    }
  }


}
