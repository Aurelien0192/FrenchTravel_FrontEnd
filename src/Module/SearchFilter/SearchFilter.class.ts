import { searchFilter } from "./SearchFilter.type"

export class SearchFilter {
    search : string
    notation? : number
    hotelCategorie? : number
    categorie? : "hotel"|"restaurant"|"activity"

    constructor(newFilter:searchFilter){
        this.search = newFilter.search
        this.notation = newFilter.notation
        this.hotelCategorie = newFilter.hotelCategorie
        this.categorie = newFilter.categorie
    }

    static createNewSearchFilter(newFilter:searchFilter): SearchFilter{
        const newSearchFilter: SearchFilter = new SearchFilter(newFilter)
        return newSearchFilter
    }
}