import { useEffect, useState } from "react"
import { placeService } from "../Place/Place.services"
import { Place } from "../Place/Place.class"
import { Categories } from "../../Application/ComplexeComponents/Places/Categories.variable"
import { useSearchParams } from "react-router-dom"
import { useCategorieSelector } from "../HotelCategorieSelector/HotelCategorieSelector.hook"

export const useSearchFilter = () => {

    const[placesSearch, setPlaceSearch] = useState<Array<Place>>()
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [categorieChoice, setCategoryChoice] = useState<string>(Categories[0])
    const [pathNewSearch, setPathNewSearch] = useSearchParams()
    const [totalOfPlace, setTotalOfPlace] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const {hotelCategorie} = useCategorieSelector()

    useEffect(()=>{
        async function getDataFromSearch(){
            const places = await placeService.getManyPlaceSearch("/places/?"+pathNewSearch.toString())
            setPlaceSearch(places.places as Array<Place>)
            setTotalOfPlace(places.total)
            
        }
        getDataFromSearch()
    },[pathNewSearch])
    
    useEffect(() => {
        if(hotelCategorie > 1){
            pathNewSearch.get("hotelCategorie")? pathNewSearch.set("hotelCategorie",hotelCategorie.toString()) : pathNewSearch.append("hotelCategorie",hotelCategorie.toString())
        }else{
            pathNewSearch.get("hotelCategorie") && pathNewSearch.delete("hotelCategorie")
        }
        setPathNewSearch(pathNewSearch)
    },[hotelCategorie])

    function changeCategorieIndex(newSelect: number){
        setPage(1)
        if(newSelect!==1){
            pathNewSearch.get('hotelCategorie') && pathNewSearch.delete('hotelCategorie')
        }
        pathNewSearch.set("categorie",catergoriesMap(newSelect))
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

function catergoriesMap(index:number){
    let category = ""
    switch(index){
        case 1 :
            category = "hotel"
            break;
        case 2:
            category = "restaurant"
            break;
        case 3:
            category = "activity"
            break;
        default:
            category=""
            break;
    }
    return category
}

