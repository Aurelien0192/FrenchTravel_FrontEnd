import { place } from "../Place/Place.type"
import { userFromServer } from "../User/User.type"

export type comment={
    categorie?: string
    comment: string
    note: number
    dateVisited: string
    accept: boolean
}

export type commentFromServer={
    _id: string
    comment: string
    like: number
    note:number
    dateVisited: Date
    create_at: Date
    user_id: userFromServer|string
    place_id: place|string
    liked:boolean
    response : commentFromServer
    isResponse: boolean
}