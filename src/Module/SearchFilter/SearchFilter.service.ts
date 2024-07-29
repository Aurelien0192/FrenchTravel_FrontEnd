import { SearchFilter } from "./SearchFilter.class";
import { searchFilterStore, SearchFilterStore } from "./SearchFilter.store";
import { searchFilter } from "./SearchFilter.type";
import { placeService } from "../Place/Place.services";


export class SearchFilterServices{

    constructor(
        private _searchFilterStore: SearchFilterStore
    ){}

    addSearchFilter(searchFilter:searchFilter){
        const newSearchFilter:SearchFilter  =  SearchFilter.createNewSearchFilter(searchFilter)
        this._searchFilterStore.searchFilter$().next(newSearchFilter)
    }

    changeSearchInput(searchFilter:SearchFilter, searchValue:string){
        searchFilter.search = searchValue
        this._searchFilterStore.searchFilter$().next({...searchFilter})
    }

    changeCategorie(searchFilter:SearchFilter, categorieChoice: string){
        switch(categorieChoice){
            case "Hôtels" :
                searchFilter.categorie = "hotel"
                break;
            case "Restaurants":
                searchFilter.categorie = "restaurant"
                break;
            case "Activités":
                searchFilter.categorie = "activity"
                break;
        }
        console.log(searchFilter)
        this._searchFilterStore.searchFilter$().next({...searchFilter})
    }

    static createAxiosQuery(searchFilter:SearchFilter){
        let query:string ="?"
        const keys = Object.keys(searchFilter)
        keys.forEach((key,index)=>{
            query = query+`${index!==0 ?"&":""}${key}=${searchFilter[key as keyof SearchFilter] ?searchFilter[key as keyof SearchFilter]:""}`
        })
        return query
    }

    static searchPlaces(e:React.FormEvent<HTMLFormElement>, categorieChoice: string){
        e.preventDefault()
        const searchOption:searchFilter = JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries())))

        switch(categorieChoice){
            case "Hôtels" :
                searchOption.categorie = "hotel"
                break;
            case "Restaurants":
                searchOption.categorie = "restaurant"
                break;
            case "Activités":
                searchOption.categorie = "activity"
                break;
        }
        
        searchFilterServices.addSearchFilter(searchOption)
        placeService.razPlacesInObservable()
    }
   
}

export const searchFilterServices = new SearchFilterServices(searchFilterStore)