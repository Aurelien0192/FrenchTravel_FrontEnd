import { AxiosServices } from "../HTTP/axios.services";
import { PlaceToSubmit } from "./Place.class";
import { placeSubmit } from "./Place.type";

export class PlaceServices{
    static  async postNewPlace(photos:Array<File>){
        await AxiosServices.postImages(photos)
    }
}