import { ApplicationService } from './../services/application.service';
import { action, makeAutoObservable } from "mobx";
import IApplication from '../types/application.type';

export class ApplicationStore {
    public application: IApplication | undefined;

    constructor(private readonly applicationService: ApplicationService) {
        makeAutoObservable(this);
    }

    async apply(user_id: string, offer_id: string) {
        try {
            this.applicationService.apply(user_id, offer_id)
        } catch (err) {
            console.log(err)
        }
    }

}
