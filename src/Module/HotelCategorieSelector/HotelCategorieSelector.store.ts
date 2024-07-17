import { BehaviorSubject } from "rxjs";

export class HotelCategorieStore{
    private readonly _hotelCategorie : BehaviorSubject<number>

    constructor(){
        this._hotelCategorie = new BehaviorSubject(1)

    }

    hotelCategorie$ = ():BehaviorSubject<number> => {
        return this._hotelCategorie
    }
}

export const hotelCategorieStore = new HotelCategorieStore()