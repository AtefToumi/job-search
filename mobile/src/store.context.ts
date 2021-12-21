import React from 'react';
import { AuthService } from './services/auth.service';
import { AuthStore } from './stores/auth.store';
import { OfferService } from './services/offer.service';
import { OfferStore } from './stores/offer.store'
import { ApplicationService } from './services/application.service';
import { ApplicationStore } from './stores/application.store';


interface IStoreContext {
    authStore: AuthStore;
    offerStore: OfferStore;
    applicationStore: ApplicationStore
}
const authService = new AuthService();
const authStore = new AuthStore(authService);

const offerService = new OfferService();
const offerStore = new OfferStore(offerService);

const applicationService = new ApplicationService();
const applicationStore = new ApplicationStore(applicationService);

export const StoreContext = React.createContext<IStoreContext>({
    authStore, offerStore, applicationStore
});