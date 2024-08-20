import { useEffect, useState } from "react"
import { responseServerGetManyFavorites } from "./Favorite.type"
import { FavoriteService } from "./Favorite.service"

export const useFavorite = (place_id:string) =>{
    const [isInFavorite, setIsInFavorite] = useState<boolean>(false)

    useEffect(()=>{
        async function getFavorite(){
            const response: responseServerGetManyFavorites = await FavoriteService.getFavorite(place_id)
            response.count>0? setIsInFavorite(true):setIsInFavorite(false)
        }
        getFavorite()
    },[])

    async function addOrDeleteFavorite(){
        const status:number = isInFavorite? await FavoriteService.removeOfFavorite(place_id) :await FavoriteService.addInFavorite(place_id)
        if(status === 201 || status === 200){
            setIsInFavorite(!isInFavorite)
        }
    }

    return {isInFavorite, addOrDeleteFavorite}
}