import { useEffect, useState } from "react"
import { placeService } from "../Place/Place.services"
import { Place } from "../Place/Place.class"
import { Categories } from "../Place/Categories.variable"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "../HotelCategorieOrNotationSelector/HotelCategorieSelectorOrNotation.hook"
import { SearchFilterServices } from "./SearchFilter.service"

export const useSearchFilter = () => {

    const[placesSearch, setPlaceSearch] = useState<Array<Place>>()
    const [pathNewSearch, setPathNewSearch] = useSearchParams()
    const [selectedIndex, setSelectedIndex] = useState<number>(Number(pathNewSearch.get("index")))
    const [categorieChoice, setCategoryChoice] = useState<string>(pathNewSearch.get("categorie") as string)
    const [totalOfPlace, setTotalOfPlace] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const {selectedNoteOrHotelCategorie} = useSelector()

    useEffect(()=>{
        async function getDataFromSearch(){
            const places = await placeService.getManyPlaceSearch("/places/?"+pathNewSearch.toString())
            setPlaceSearch(places.places as Array<Place>)
            setTotalOfPlace(places.total)
            
        }
        getDataFromSearch()
    },[pathNewSearch])
    
    useEffect(() => {
        if(selectedNoteOrHotelCategorie > 1){
            pathNewSearch.get("hotelCategorie")? pathNewSearch.set("hotelCategorie",selectedNoteOrHotelCategorie.toString()) : pathNewSearch.append("hotelCategorie",selectedNoteOrHotelCategorie.toString())
        }else{
            pathNewSearch.get("hotelCategorie") && pathNewSearch.delete("hotelCategorie")
        }
        setPathNewSearch(pathNewSearch)
    },[selectedNoteOrHotelCategorie])

    function changeCategorieIndex(newSelect: number){
        setPage(1)
        if(newSelect!==1){
            pathNewSearch.get('hotelCategorie') && pathNewSearch.delete('hotelCategorie')
        }
        pathNewSearch.set("categorie",SearchFilterServices.catergoriesMap(newSelect))
        pathNewSearch.set('page',"1")
        setPathNewSearch(pathNewSearch)
        setCategoryChoice(Categories[newSelect])
        setSelectedIndex(newSelect)          
    }

    function changePage(page:number){
        setPage(page)
        pathNewSearch.set('page',page.toString())
        setPathNewSearch(pathNewSearch)
    }

    function changeSearchInput(inputValue:string){
        setPage(1)
        pathNewSearch.set('search',inputValue)
        setPathNewSearch(pathNewSearch)
    }

    

    return { pathNewSearch, placesSearch, selectedIndex, categorieChoice, totalOfPlace, page, changePage, changeCategorieIndex, changeSearchInput}
}



