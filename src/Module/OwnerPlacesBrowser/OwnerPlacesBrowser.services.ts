import { AxiosResponse } from "axios"
import { PlaceServices } from "../Place/Place.services"

export class OwnerPlacesBrowserServices{
    static async deleteOnePlace(id:string){
        const response: AxiosResponse = await PlaceServices.deleteOnePlace(id)

        if(response.status === 200){
            window.alert("la suppression s'est correctement déroulée")
            window.location.reload()
        }else{
            window.alert("un problème est survenu lors de la suppression")
        }
    }
}