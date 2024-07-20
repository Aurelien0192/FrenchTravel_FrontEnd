import { axiosResponseStore, AxiosResponseStore } from "./axiosResponse.store";
import { AxiosResponseError } from "./axiosResponseError.dto";

export class AxiosResponseServices{
    constructor(
        private _axiosResponseStore: AxiosResponseStore
    ){}

    updateAxiosResponse(responseaxios:AxiosResponseError){
        const newResponseAxios : AxiosResponseError = responseaxios
        this._axiosResponseStore.serverResponse$().next(newResponseAxios)
    }

    static responseServerPostUser(status:number):string{
        switch(status){
            case 405 :
                return "Des champs obligatoires n'ont pas été renseignées"
            case 1 :
                return "Le mots de passe de confirmation ne correspond pas au mot de passe choisi"
            case 201 : 
                return "La création de votre compte c'est bien déroulée"
            case 500 :
                return "une erreur interne au serveur c'est produite, réessayer ultérieurement"
            default :
                return ""
        }
    }
}

export const axiosResponseServices = new AxiosResponseServices(axiosResponseStore)