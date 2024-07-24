import { useEffect, useState } from "react"
import { placeStore } from "./Place.store"
import { Place } from "./Place.class"
import { placeService } from "./Place.services"

type PlacesTabToFirstPage = {
    restaurant : Array<Place>
    activity : Array<Place>
}

export const usePlaceToDisplayInFirstPage = () =>{
    const[placesFirstPage, setPlacesFirstPage] = useState<PlacesTabToFirstPage>({restaurant:[],activity:[]})

    useEffect(()=>{
        placeService.getPlace('/places/random')
        const placesToDisplayInFirstPage = placeStore.places$().subscribe((newPlacesTab) => {
            const PlacesTabToFirstPage: PlacesTabToFirstPage = {restaurant:[],activity:[]}
            newPlacesTab.forEach((place) => {
                PlacesTabToFirstPage[place.getCategorie()].push(place)
            })
            setPlacesFirstPage(PlacesTabToFirstPage)
        })

        return(() => {placesToDisplayInFirstPage.unsubscribe()})
    },[])

    return { placesFirstPage }
}