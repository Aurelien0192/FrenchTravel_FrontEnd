import { BehaviorSubject } from "rxjs";


/*Store pour le choix de la catégorie d'hôtel. Observable initialement égal à 1 */
export class HotelCategorieOrNotationStore{
    private readonly _hotelCategorieOrNotation : BehaviorSubject<number>

    constructor(){
        this._hotelCategorieOrNotation = new BehaviorSubject(1)

    }

    hotelCategorieOrNotation$ = ():BehaviorSubject<number> => {
        return this._hotelCategorieOrNotation
    }
}

export const hotelCategorieOrNotationStore = new HotelCategorieOrNotationStore()