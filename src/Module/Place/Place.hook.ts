import { useEffect, useState } from "react"
import { placeStore } from "./Place.store"
import { Place } from "./Place.class"
import { placeService } from "./Place.services"
import { queryGetPlace } from "../HTTP/axios.type"

export type placesTab = {
    restaurant : Array<Place>
    activity : Array<Place>
    hotel: Array<Place>
    search: Array<Place>
}

export const usePlaceToDisplay = () =>{
    const[placeToDisplay, setPlacesFirstPage] = useState<placesTab>({restaurant:[],activity:[],hotel:[],search:[]})

    useEffect(()=>{
        const placesToDisplay = placeStore.placeTab$().subscribe((newPlacesTab) => {
            setPlacesFirstPage({...newPlacesTab})
        })

        return(() => {placesToDisplay.unsubscribe()})
    },[])

    async function updatePlaceToDisplay(type:string,body?:queryGetPlace){

            const places = await placeService.getManyPlace(`/places${type}`,body && body)
            const PlacesTab: placesTab = {restaurant:[],activity:[],hotel:[],search:[]}
            places.forEach((place) => {
                PlacesTab[place.getCategorie()].push(place)
            })
            
            placeStore.placeTab$().next(PlacesTab)

        }

    return { placeToDisplay, updatePlaceToDisplay }
}