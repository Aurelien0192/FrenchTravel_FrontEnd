import { useEffect, useState } from "react"
import { placeService } from "../Place/Place.services"
import { Place } from "../Place/Place.class"
import { Categories } from "../../Application/ComplexeComponents/Places/Categories.variable"
import { useSearchParams } from "react-router-dom"

export const useSearchFilter = () => {

    const[placesSearch, setPlaceSearch] = useState<Array<Place>>()
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [categorieChoice, setCategoryChoice] = useState<string>(Categories[0])
    const [pathNewSearch, setPathNewSearch] = useSearchParams()
    const [totalOfPlace, setTotalOfPlace] = useState<number>(0)
    const [page, setPage] = useState<number>(1)


    useEffect(()=>{
        async function getDataFromSearch(){
            const places = await placeService.getManyPlaceSearch("/places/?"+pathNewSearch.toString())
            setPlaceSearch(places.places as Array<Place>)
            setTotalOfPlace(places.total)
        }
        getDataFromSearch()
        },[pathNewSearch])

    function changeSelected(newSelect: number){
            setPage(1)
            setPathNewSearch({
                search:`${pathNewSearch.get('search')}`,
                categorie: catergoriesMap(newSelect),
                page:"1"
            })
            setCategoryChoice(Categories[newSelect])
            console.log(pathNewSearch.toString())
            setSelectedIndex(newSelect)
            
    }

    function changePage(page:number){
        setPage(page)
        setPathNewSearch({
                search:`${pathNewSearch.get('search')}`,
                categorie: `${pathNewSearch.get('categorie')}`,
                page: page.toString()
            })
    }

    function changeSearchInput(inputValue:string){
        setPage(1)
        setPathNewSearch({
                search:inputValue,
                categorie: `${pathNewSearch.get('categorie')}`,
                page:"1"
            })
    }

    return { pathNewSearch, placesSearch, selectedIndex, categorieChoice, totalOfPlace, page, changePage, changeSelected, changeSearchInput}
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

