import { BehaviorSubject } from "rxjs"

export class AxiosResponseStore{
    private readonly _serverResponse: BehaviorSubject<number>

    constructor(){
        this._serverResponse = new BehaviorSubject(0)
    }

    serverResponse$ = ():BehaviorSubject<number> =>{
        return this._serverResponse
    }
}

export const axiosResponseStore = new AxiosResponseStore