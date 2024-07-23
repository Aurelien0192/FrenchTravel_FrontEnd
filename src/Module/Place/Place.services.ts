import { AxiosServices } from "../HTTP/axios.services";
import { Place, PlaceToSubmit } from "./Place.class";
import { placeStore, PlaceStore } from "./Place.store";
import { place, placeSubmit } from "./Place.type";

export class PlaceServices{

    constructor(
        private _placeStore: PlaceStore
    ){}

    async getPlace(path:string){
        const placeApi:Array<place> = await AxiosServices.getDataFromDatabase(path) as Array<place>
        const place:Array<Place>=  placeApi.map((e) => {return Place.createNewPlace(e)})
        this._placeStore.places$().next(place)
    }

    static async postNewPlace(photos:Array<File>,data: placeSubmit){
        const dataToSubmit = PlaceToSubmit.createNewPlaceToSubmit(data)
        let response = await AxiosServices.postInDataBase("/place",dataToSubmit)
        if (response!.status === 201){
            response = await AxiosServices.postImages(photos, response?.data._id)
        }
        return response
    }
}

export const placeService = new PlaceServices(placeStore)