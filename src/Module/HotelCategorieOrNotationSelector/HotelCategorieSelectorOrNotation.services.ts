import { HotelCategorieOrNotationStore,hotelCategorieOrNotationStore } from "./HotelCategorieSelectorOrNotation.store"
/*service permettant l'update de l'observable pour le choix de la catégorie d'hôtel */
class HotelCategorieOrNotationService{

    constructor(
        private _hotelCategorieOrNotationStore : HotelCategorieOrNotationStore
    ){}

    changehotelCategorieOrNotation(newNoteOrCategorie: number){
        this._hotelCategorieOrNotationStore.hotelCategorieOrNotation$().next(newNoteOrCategorie)
    }
    
}

export const hotelCategorieOrNotationService = new HotelCategorieOrNotationService(hotelCategorieOrNotationStore)