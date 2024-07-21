import { BehaviorSubject } from "rxjs";


/*Store pour le choix de la catégorie d'hôtel. Observable initialement égal à 1 */
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