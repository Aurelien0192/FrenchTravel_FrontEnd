import { BehaviorSubject } from "rxjs"
import { AxiosResponseError } from "./axiosResponseError.dto"

export class AxiosResponseStore{
    private readonly _serverResponse: BehaviorSubject<AxiosResponseError>

    constructor(){
        this._serverResponse = new BehaviorSubject({} as AxiosResponseError)
    }

    serverResponse$ = ():BehaviorSubject<AxiosResponseError> =>{
        return this._serverResponse
    }
}

export const axiosResponseStore = new AxiosResponseStore