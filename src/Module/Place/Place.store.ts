import { BehaviorSubject } from "rxjs";
import { Place } from "./Place.class";
import { placesTab } from "./Place.hook";

export class PlaceStore{
    private readonly _place : BehaviorSubject<Array<Place>>
    private readonly _placeTab : BehaviorSubject<placesTab>

    constructor(){
        this._place = new BehaviorSubject([] as Array<Place>)
        this._placeTab = new BehaviorSubject({} as placesTab)
    }

    places$ = ():BehaviorSubject<Array<Place>> => {
        return this._place
    }

    placeTab$ = ():BehaviorSubject<placesTab> => {
        return this._placeTab
    }
}

export const placeStore = new PlaceStore()