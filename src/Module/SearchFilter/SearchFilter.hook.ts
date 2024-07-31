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


    useEffect(()=>{
        console.log("ok")

        async function getDataFromSearch(){
            setPlaceSearch([])
            const places = await placeService.getManyPlaceSearch("/places/?"+pathNewSearch.toString())
            setPlaceSearch(places as Array<Place>)
        }
        getDataFromSearch()
        },[categorieChoice])

    function changeSelected(newSelect: number){
            setPathNewSearch({
                search:`${pathNewSearch.get('search')}`,
                categorie: catergoriesMap(newSelect)
            })
            setCategoryChoice(Categories[newSelect])
            console.log(pathNewSearch.toString())
            setSelectedIndex(newSelect)
            
    }

    return { pathNewSearch, placesSearch, selectedIndex, categorieChoice, changeSelected}
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

