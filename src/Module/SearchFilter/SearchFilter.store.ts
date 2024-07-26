import { BehaviorSubject } from "rxjs";
import { SearchFilter } from "./SearchFilter.class";

export class SearchFilterStore{
    private readonly _searchFilter : BehaviorSubject<SearchFilter>

    constructor(){
        this._searchFilter = new BehaviorSubject({} as SearchFilter)
    }

    searchFilter$ = ():BehaviorSubject<SearchFilter> => {
        return this._searchFilter
    }
}

export const searchFilterStore = new SearchFilterStore()