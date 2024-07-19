import { AxiosServices } from "../HTTP/axios.services";
import { PlaceToSubmit } from "./Place.class";
import { placeSubmit } from "./Place.type";

export class PlaceServices{
    static async postNewPlace(photos:Array<File>,data: placeSubmit){
        const dataToSubmit = PlaceToSubmit.createNewPlaceToSubmit(data)
        let response = await AxiosServices.postInDataBase("/place",dataToSubmit)
        if (response!.status === 201){
            response = await AxiosServices.postImages(photos, response?.data._id)
        }
        return response?.status
    }
}