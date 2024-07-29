import { useEffect, useState } from "react"
import { searchFilterStore } from "./SearchFilter.store"
import { SearchFilter } from "./SearchFilter.class"
import { placeService } from "../Place/Place.services"
import { Place } from "../Place/Place.class"
import { SearchFilterServices } from "./SearchFilter.service"
import { Categories } from "../../Application/ComplexeComponents/Places/Categories.variable"

export const useSearchFilter = () => {
    const[searchFilter, setSearchFilter] = useState<SearchFilter>()
    const[placesSearch, setPlaceSearch] = useState<Array<Place>>()
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [categorieChoice, setCategoryChoice] = useState<string>(Categories[0])


    useEffect(()=>{
        const searchFilte = searchFilterStore.searchFilter$().subscribe(async (newSearch) => {
            const places = await placeService.getManyPlaceSearch("/places"+SearchFilterServices.createAxiosQuery(newSearch))
            setPlaceSearch(places as Array<Place>)
            setSearchFilter(newSearch)
        })
        
        return(() => {searchFilte.unsubscribe()})
    },[categorieChoice])

    function changeSelected(newSelect: number){
        setCategoryChoice(Categories[newSelect])
        setSelectedIndex(newSelect)
    }

    return {searchFilter, placesSearch, selectedIndex, categorieChoice, changeSelected}
}

