import { commentFromServer } from "../Comment/comment.type"
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

export type responseGetManyComments = {
    count: number
    results: Array<commentFromServer>
}