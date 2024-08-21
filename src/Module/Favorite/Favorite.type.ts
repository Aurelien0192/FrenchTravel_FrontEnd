import { place } from "../Place/Place.type"

export type favorite = {
    _id:string
    user:string,
    place:place,
    folder?:string,
    visited:boolean
}

export type responseServerGetManyFavorites={
    count:number,
    results:Array<favorite>
}