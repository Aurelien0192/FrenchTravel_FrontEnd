import { useEffect, useState } from "react"
import { placeStore } from "./Place.store"
import { Place } from "./Place.class"
import { placeService } from "./Place.services"

type placesTab = {
    restaurant : Array<Place>
    activity : Array<Place>
    hotel: Array<Place>
    search: Array<Place>
}

export const usePlaceToDisplay = (type:string,body?:object) =>{
    const[placeToDisplay, setPlacesFirstPage] = useState<placesTab>({restaurant:[],activity:[],hotel:[],search:[]})

    useEffect(()=>{
        placeService.getManyPlace(`/places${type}`,body && body)
        const placesToDisplay = placeStore.places$().subscribe((newPlacesTab) => {
            const PlacesTab: placesTab = {restaurant:[],activity:[],hotel:[],search:[]}
            if(type){
                newPlacesTab.forEach((place) => {
                    PlacesTab[place.getCategorie()].push(place)
                })
            }else{
                PlacesTab.search = [... newPlacesTab]
            }
            setPlacesFirstPage(PlacesTab)
        })

        return(() => {placesToDisplay.unsubscribe()})
    },[])

    return { placeToDisplay }
}