import { AxiosServices } from "../HTTP/axios.services";
import { PlaceToSubmit } from "./Place.class";
import { placeSubmit } from "./Place.type";

export class PlaceServices{
    static async postNewPlace(photos:Array<File>,data: placeSubmit){
        const dataToSubmit = PlaceToSubmit.createNewPlaceToSubmit(data)
        const response = await AxiosServices.postNewPlace(dataToSubmit)
        if (response!.status === 201){
            await AxiosServices.postImages(photos, response?.data._id)
        }
    }
}