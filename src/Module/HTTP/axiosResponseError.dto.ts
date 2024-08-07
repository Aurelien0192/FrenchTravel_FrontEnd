import { axiosResponseError } from "./axiosResponseError.type"
 /* Classe permettant la création d'un objet de la réponse du serveur avec les propriétés nécessaires à leur traitement. */
export class AxiosResponseError{
    private _msg:string|undefined
    private _fields_with_error:Array<string>|undefined
    private _fields:object|undefined
    private _type_error: string|undefined
    private _status : number

    constructor(responseServer: axiosResponseError|undefined, status:number){
        if(responseServer){
            this._msg = responseServer.msg
            this._fields_with_error = responseServer.fields_with_error
            this._fields = responseServer.fields
            this._type_error = responseServer.type_error
        }
        this._status = status
    }

    getMsg(){
        return this._msg
    }

    getFieldsWithError(){
        return this._fields_with_error
    }

    getFields(){
        return this._fields
    }

    getType_error(){
        return this._type_error 
    }

    getStatus(){
        return this._status
    }
    
    setStatus(newStatus:number){
        this._status = newStatus
    }

    static getACopie(ancientResponse : AxiosResponseError){
        const newAxiosResponseError: axiosResponseError = {
            msg: ancientResponse.getMsg() as string,
            fields_with_error: ancientResponse.getFieldsWithError() as Array<string>,
            fields : ancientResponse.getFields() as object,
            type_error : ancientResponse.getType_error() as string
        }
        const newStatus = ancientResponse.getStatus()
        return AxiosResponseError.createNewResponseError(newAxiosResponseError, newStatus)
    }
    static createNewResponseError(responseServer: axiosResponseError|undefined, status:number): AxiosResponseError{
        const newAxiosResponseError = new AxiosResponseError(responseServer, status)
        return newAxiosResponseError
    }
}