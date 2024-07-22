import { AxiosResponse } from "axios"
import { authentificationRequestData } from "./Authentification.type"

export class AuthentificationToSubmit{
    private readonly username: string
    private readonly password: string

    constructor(authentification : authentificationRequestData){
        this.username = authentification.username
        this.password = authentification.password
    }

    getUsername(){
        return this.username
    }

    getPassword(){
        return this.password
    }

    static createAuthentificationToSubmit(authentification: authentificationRequestData): AuthentificationToSubmit{
        const newAuthentificationToSubmit = new AuthentificationToSubmit(authentification)
        return newAuthentificationToSubmit
    }
}

export class AuthentifiateUser{
    private readonly _id:string
    private readonly token:string
    private readonly username:string
    private readonly userType:string

    constructor(responseServer: AxiosResponse){
        this._id = responseServer.data._doc._id
        this.token = responseServer.data.token
        this.username = responseServer.data._doc.username
        this.userType = responseServer.data._doc.userType
    }

    getId(){
        return this._id
    }

    getToken(){
        return this.token
    }

    getUsername(){
        return this.username
    }

    getUserType(){
        return this.userType
    }

    static createAuthentifiateUser(responseServer: AxiosResponse): AuthentifiateUser{
        const newAuthentifiateUser = new AuthentifiateUser(responseServer)
        return newAuthentifiateUser
    }
}