import { searchFilter } from "./SearchFilter.type"

export class SearchFilter {
    private search : string
    private notation? : number
    private hotelCategorie? : number
    private categorie? : "hotel"|"restaurant"|"restaurant"

    constructor(newFilter:searchFilter){
        this.search = newFilter.search
        this.notation = newFilter.notation
        this.hotelCategorie = newFilter.hotelCategorie
        this.categorie = newFilter.categorie
    }

    getSearch(){
        return this.search
    }

    getNotation(){
        return this.notation
    }

    getHotelCategorie(){
        return this.hotelCategorie
    }

    getCategorie(){
        return this.categorie
    }

    static createNewSearchFilter(newFilter:searchFilter): SearchFilter{
        const newSearchFilter:SearchFilter = new SearchFilter(newFilter)
        return newSearchFilter
    }
}