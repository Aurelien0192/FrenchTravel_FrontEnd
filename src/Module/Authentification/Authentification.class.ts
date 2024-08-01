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
    private readonly profilePhoto:string

    constructor(responseServer: AxiosResponse){
        console.log(responseServer)
        this._id = responseServer.data._id
        this.token = responseServer.data.token
        this.username = responseServer.data.username
        this.userType = responseServer.data.userType
        this.profilePhoto = "http://localhost:3001/"+responseServer.data.profilePhoto.path
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

    getProfilePhoto(){
        return this.profilePhoto
    }

    static createAuthentifiateUser(responseServer: AxiosResponse): AuthentifiateUser{
        const newAuthentifiateUser = new AuthentifiateUser(responseServer)
        return newAuthentifiateUser
    }
}