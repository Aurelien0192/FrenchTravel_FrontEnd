import { AxiosResponse } from "axios"
import { authentificationRequestData } from "./Authentification.type"
import { getURL } from "../HTTP/axios.instance"

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
    private readonly firstName: string
    private readonly lastName: string
    private readonly email:string
    private readonly token:string
    private readonly username:string
    private readonly userType:string
    private readonly about:string
    private readonly profilePhoto:string

    constructor(responseServer: AxiosResponse){
        this._id = responseServer.data._id
        this.token = responseServer.data.token
        this.firstName = responseServer.data.firstName
        this.lastName = responseServer.data.lastName
        this.username = responseServer.data.username
        this.email = responseServer.data.email
        this.userType = responseServer.data.userType
        this.about = responseServer.data.about
        this.profilePhoto = `http://${getURL()}:3001/`+(responseServer.data.profilePhoto.path ? responseServer.data.profilePhoto.path : "data/images/noPhoto.png1722879215765.png")
    }

    getId(){
        return this._id
    }

    getToken(){
        return this.token
    }

    getFirstName(){
        return this.firstName
    }

    getLastName(){
        return this.lastName
    }

    getUsername(){
        return this.username
    }

    getEmail(){
        return this.email
    }

    getAbout(){
        return this.about
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