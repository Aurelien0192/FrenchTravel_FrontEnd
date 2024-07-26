import { SearchFilter } from "./SearchFilter.class";
import { searchFilterStore, SearchFilterStore } from "./SearchFilter.store";
import { searchFilter } from "./SearchFilter.type";


export class SearchFilterServices{

    constructor(
        private _searchFilterStore: SearchFilterStore
    ){}

    addSearchFilter(searchFilter:searchFilter){
        const newSearchFilter =  SearchFilter.createNewSearchFilter(searchFilter)
        this._searchFilterStore.searchFilter$().next(newSearchFilter)
    }
}

export const searchFilterServices = new SearchFilterServices(searchFilterStore)