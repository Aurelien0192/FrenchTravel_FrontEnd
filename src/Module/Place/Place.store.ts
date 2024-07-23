import { BehaviorSubject } from "rxjs";
import { Place } from "./Place.class";

export class PlaceStore{
    private readonly _place : BehaviorSubject<Array<Place>>

    constructor(){
        this._place = new BehaviorSubject([] as Array<Place>)
    }

    places$ = ():BehaviorSubject<Array<Place>> => {
        return this._place
    }
}

export const placeStore = new PlaceStore()