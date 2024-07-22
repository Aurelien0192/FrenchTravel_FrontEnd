import { BehaviorSubject } from "rxjs"
import { AuthentifiateUser } from "./Authentification.class"

export class AuthentificationStore {
    private readonly _authentifiateUser: BehaviorSubject<AuthentifiateUser>

    constructor(){
        this._authentifiateUser = new BehaviorSubject({} as AuthentifiateUser)
    }

    authentifiateUser$ = ():BehaviorSubject<AuthentifiateUser> =>{
        return this._authentifiateUser
    }
}

export const authentificationStore = new AuthentificationStore