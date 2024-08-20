import { AxiosResponse } from "axios";
import { AxiosServices } from "../HTTP/axios.services";
import { responseServerGetManyFavorites } from "./Favorite.type";

export class FavoriteService{
    static async getFavorite(place_id:string){
        const FavoriteResponse: responseServerGetManyFavorites = await AxiosServices.getDataFromDatabase(`/favorites?ids=${place_id}`) as responseServerGetManyFavorites
        return FavoriteResponse
    }

    static async addInFavorite(place_id:string){
        const response:AxiosResponse = await AxiosServices.postInDataBase(`/favorite/${place_id}`,null) as AxiosResponse
        return response.status
    }

    static async removeOfFavorite(place_id:string){
        const response: AxiosResponse = await AxiosServices.deleteElementOnServer(`favorite/${place_id}`) as AxiosResponse
        return response.status
    }
}