import { axiosResponseStore, AxiosResponseStore } from "./axiosResponse.store";
import { AxiosResponseError } from "./axiosResponseError.dto";

/* services permettant l'update de l'observable serverResponse et de fournir un message à afficher adéquat à la réponse du serveur */
export class AxiosResponseServices{
    constructor(
        private _axiosResponseStore: AxiosResponseStore
    ){}

    updateAxiosResponse(responseaxios:AxiosResponseError){
        this._axiosResponseStore.serverResponse$().next(responseaxios)
    }

    static async responseServerPostUser(status:number):Promise<string>{
        switch(status){
            case 405 :
                return "Des champs obligatoires n'ont pas été renseignées ou sont incorrectes"
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

    static async responseServerUpdateUser(status:number):Promise<string>{
        switch(status){
            case 405 :
                return "Des champs obligatoires n'ont pas été renseignées ou sont incorrectes"
            case 200 : 
                return "La mise à jour de votre compte c'est bien déroulée"
            case 500 :
                return "une erreur interne au serveur c'est produite, réessayer ultérieurement"
            default :
                return ""
        }
    }

    static responseServerPostPlace(status:number):string{
        switch(status){
            case 405 :
                return "Des champs obligatoires n'ont pas été renseignées ou sont incorrectes"
            case 201 : 
                return "La création du lieu c'est correctement déroulée"
            case 401 :
                return "La création d'un nouveau lieu ne vous est pas autorisé"
            case 404 :
                return "L'adresse renseignée n'a pas été trouvée, vérifier l'adresse"
            case 500 :
                return "une erreur interne au serveur c'est produite, réessayer ultérieurement"
            default :
                return ""
        }
    }

    static responseServerLogin(status:number):string{
        switch(status){
            case 405 :
                return "Des champs obligatoires n'ont pas été renseignées ou sont incorrectes"
            case 401 :
                return "Le nom d'utilisateur ou mot de passe n'est pas correct"
            case 500 :
                return "une erreur interne au serveur c'est produite, réessayer ultérieurement"
            default :
                return ""
        }
    }
}

export const axiosResponseServices = new AxiosResponseServices(axiosResponseStore)