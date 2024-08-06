import { image } from "../Image/Image.type"
import { place } from "../Place/Place.type"


export type axiosResponseError ={
    msg:string
    fields_with_error:Array<string>
    fields:object
    type_error: string
}

export type responseGetManyPlaces = {
    count : number
    results : Array<place>
}

export type responseGetManyImages = {
    count: number
    results: Array<image>
}