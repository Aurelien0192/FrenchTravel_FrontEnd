import { HotelCategorieStore,hotelCategorieStore } from "./HotelCategorieSelector.store"

class HotelCategorieService{

    constructor(
        private _hotelCategorieStore : HotelCategorieStore
    ){}

    changehotelCategorie(newCategorie: number){
        this._hotelCategorieStore.hotelCategorie$().next(newCategorie)
    }
    
}

export const hotelCategorieService = new HotelCategorieService(hotelCategorieStore)