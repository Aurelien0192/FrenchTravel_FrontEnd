import { Place } from "../Place/Place.class"
import { favorite } from "./Favorite.type"

export class Favorite{
    private id:string
    private place: Place
    private folder?: string
    private visited : boolean

    constructor(favoriteFromServer:favorite){
        this.id = favoriteFromServer._id
        this.place = Place.createNewPlace(favoriteFromServer.place)
        this.folder = favoriteFromServer.folder
        this.visited = favoriteFromServer.visited
    }

    getId(){
        return this.id
    }

    getPlace(){
        return this.place
    }

    getFolder(){
        return this.folder
    }
    
    getVisited(){
        return this.visited
    }

    static createNewFavorite(favoriteFromServer: favorite){
        const newFavorite = new Favorite(favoriteFromServer)
        return newFavorite
    }
} 