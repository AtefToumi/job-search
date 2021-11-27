import React from 'react';
import { AuthService } from './services/auth.service';
import { AuthStore } from './stores/auth.store';
import { OfferService } from './services/offer.service';
import { OfferStore } from './stores/offer.store'


interface IStoreContext {
    authStore: AuthStore;
    offerStore: OfferStore;
}
const authService = new AuthService();
const authStore = new AuthStore(authService);

const offerService = new OfferService();
const offerStore = new OfferStore(offerService);

export const StoreContext = React.createContext<IStoreContext>({
    authStore, offerStore
});