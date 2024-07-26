import { useEffect, useState } from "react"
import { searchFilterStore } from "./SearchFilter.store"
import { SearchFilter } from "./SearchFilter.class"

export const useSearchFilter = () => {
    const[searchFilter, setSearchFilter] = useState<SearchFilter>()

    useEffect(()=>{
        const searchFilter = searchFilterStore.searchFilter$().subscribe((newSearch) => {
            setSearchFilter(newSearch)
        })
        
        return(() => {searchFilter.unsubscribe()})
    },[])

    return {searchFilter}
}
