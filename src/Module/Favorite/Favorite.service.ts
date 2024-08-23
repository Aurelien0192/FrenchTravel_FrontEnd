import { AxiosResponse } from "axios";
import { AxiosServices } from "../HTTP/axios.services";
import { modifyFavorite, responseServerGetManyFavorites } from "./Favorite.type";

export class FavoriteService{
    static async getFavorite(place_id:string){
        const FavoriteResponse: responseServerGetManyFavorites = await AxiosServices.getDataFromDatabase(`/favorites?ids=${place_id}`) as responseServerGetManyFavorites
        return FavoriteResponse
    }

    static async addInFavorite(place_id:string){
        const response:AxiosResponse = await AxiosServices.postInDataBase(`/favorite/${place_id}`,null) as AxiosResponse
        return response.status
    }

    static async removeOfFavorite(placeOrFavorite_id:string){
        const response: AxiosResponse = await AxiosServices.deleteElementOnServer(`/favorite/${placeOrFavorite_id}`) as AxiosResponse
        return response.status
    }

    static async getsFavoritesOfUser(page:number, ids?:string, search?:string, categorie?:string){
        const response:responseServerGetManyFavorites = await AxiosServices.getDataFromDatabase(`/favorites?page=${page}&limit=9${ids?ids==="uncategorized"?"&option=true":`&ids=${ids}`:""}${search?`&search=${search}`:""}${categorie?`&categorie=${categorie}`:""}`) as responseServerGetManyFavorites
        return response
    }

    static async udpateFavorite(favorite_id:string, data:modifyFavorite){
        const response:AxiosResponse = await AxiosServices.updateElementOnServer(`/favorite/${favorite_id}`,data) as AxiosResponse
        return response
    }
}