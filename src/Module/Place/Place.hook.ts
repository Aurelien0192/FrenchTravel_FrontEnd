import { useEffect, useState } from "react"
import { placeStore } from "./Place.store"
import { Place } from "./Place.class"
import { placeService } from "./Place.services"

export const usePlaceToDisplayInFirstPage = () =>{
    const[placesFirstPage, setPlacesFirstPage] = useState<Array<Place>>([])

    useEffect(()=>{
        placeService.getPlace('/places/random')
        const placesToDisplayInFirstPage = placeStore.places$().subscribe((newPlacesTab) => {
            setPlacesFirstPage([...newPlacesTab])
        })

        return(() => {placesToDisplayInFirstPage.unsubscribe()})
    },[])

    return { placesFirstPage }
}