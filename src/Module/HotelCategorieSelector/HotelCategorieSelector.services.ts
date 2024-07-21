import { HotelCategorieStore,hotelCategorieStore } from "./HotelCategorieSelector.store"
/*service permettant l'update de l'observable pour le choix de la catégorie d'hôtel */
class HotelCategorieService{

    constructor(
        private _hotelCategorieStore : HotelCategorieStore
    ){}

    changehotelCategorie(newCategorie: number){
        this._hotelCategorieStore.hotelCategorie$().next(newCategorie)
    }
    
}

export const hotelCategorieService = new HotelCategorieService(hotelCategorieStore)