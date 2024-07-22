import { FormEvent } from "react";
import { authentificationRequestData } from "./Authentification.type";
import { AuthentifiateUser, AuthentificationToSubmit } from "./Authentification.class";
import { AxiosServices } from "../HTTP/axios.services";
import { AxiosResponse } from "axios";
import { authentificationStore, AuthentificationStore } from "./Authentification.store";
import { AxiosResponseError } from "../HTTP/axiosResponseError.dto";
export class AuthentificationServices{

    constructor(
        private _authentificationStore: AuthentificationStore
    ){}

    updateAuthentifiateUser(newAuthentifiateUser:AuthentifiateUser){
        this._authentificationStore.authentifiateUser$().next(newAuthentifiateUser)
    }

    static async handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault()

        const form : HTMLFormElement = e.currentTarget
        const formData = new FormData(form)
        const formJSON = Object.fromEntries(formData.entries())
        const data: authentificationRequestData = JSON.parse(JSON.stringify(formJSON))
        const responseServer:AxiosResponse = await this.submitAuthentification(data) as AxiosResponse
        if(responseServer.status === 200){
            authentificationService.updateAuthentifiateUser(AuthentifiateUser.createAuthentifiateUser(responseServer))
            sessionStorage.setItem("UserAuthentifiate",JSON.stringify(responseServer))
        }
        return  AxiosResponseError.createNewResponseError(responseServer.data, responseServer.status)
    }

    static async submitAuthentification(data: authentificationRequestData){
        const authentification = AuthentificationToSubmit.createAuthentificationToSubmit(data)
        let response = await AxiosServices.postInDataBase("/login",authentification)

        return response
    }
}

export const authentificationService = new AuthentificationServices(authentificationStore)