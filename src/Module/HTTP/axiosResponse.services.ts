import { axiosResponseStore, AxiosResponseStore } from "./axiosResponse.store";

class AxiosResponseServices{
    constructor(
        private _axiosResponseStore: AxiosResponseStore
    ){}

    updateAxiosResponse(responseaxios:number){
        this._axiosResponseStore.serverResponse$().next(responseaxios)
    }
}

export const axiosResponseServices = new AxiosResponseServices(axiosResponseStore)