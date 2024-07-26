import { useEffect, useState } from "react"
import { searchFilterStore } from "./SearchFilter.store"
import { SearchFilter } from "./SearchFilter.class"
import { placeService } from "../Place/Place.services"
import { Place } from "../Place/Place.class"

export const useSearchFilter = () => {
    const[searchFilter, setSearchFilter] = useState<SearchFilter>()
    const[placesSearch, setPlaceSearch] = useState<Array<Place>>()

    useEffect(()=>{
        const searchFilte = searchFilterStore.searchFilter$().subscribe(async (newSearch) => {
            const places = await placeService.getManyPlaceSearch("/places"+createAxiosQuery(newSearch))
            console.log(places)
            setPlaceSearch(places as Array<Place>)
            setSearchFilter(newSearch)
        })
        
        return(() => {searchFilte.unsubscribe()})
    },[])

    return {searchFilter, placesSearch}
}

function createAxiosQuery(searchFilter:SearchFilter){
        let query:string ="?"
        const keys = Object.keys(searchFilter)
        keys.forEach((key,index)=>{
            query = query+`${index!==0 ?"&":""}${key}=${searchFilter[key as keyof SearchFilter] ?searchFilter[key as keyof SearchFilter]:""}`
        })
        return query
    }

