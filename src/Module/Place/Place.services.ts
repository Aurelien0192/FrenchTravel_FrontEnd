import { AxiosServices } from "../HTTP/axios.services";
import { queryGetPlace } from "../HTTP/axios.type";
import { responseGetManyPlaces } from "../HTTP/axiosResponseError.type";
import { Place, PlaceToSubmit } from "./Place.class";
import { placeStore, PlaceStore } from "./Place.store";
import { place, placeSubmit } from "./Place.type";

export class PlaceServices{

    constructor(
        private _placeStore: PlaceStore
    ){}

    async getManyPlace(path:string, body?:queryGetPlace){
        const responseServeur: Array<place> = await AxiosServices.getDataFromDatabase(path, body && body) as Array<place>
        console.log(path)
        const places:Array<Place>=  responseServeur.map((e) => {return Place.createNewPlace(e)})
        this._placeStore.places$().next(places)
        return places
    }

    async getManyPlaceSearch(path:string){
        const responseServeur:responseGetManyPlaces = await AxiosServices.getDataFromDatabase(path) as responseGetManyPlaces
        const placesApi: Array<place> = responseServeur.results
        const places:Array<Place>=  placesApi.map((e) => {return Place.createNewPlace(e)})
        return places
    }

    async razPlacesInObservable(){
        this._placeStore.places$().next([])
    }

    static async getOnePlace(path:string): Promise<Place>{
        const placeApi:place = await AxiosServices.getDataFromDatabase(path) as place
        const place = Place.createNewPlace(placeApi)
        return place
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