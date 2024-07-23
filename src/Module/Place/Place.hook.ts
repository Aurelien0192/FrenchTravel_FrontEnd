import { useEffect, useState } from "react"
import { placeStore } from "./Place.store"
import { Place } from "./Place.class"
import { placeService } from "./Place.services"

export const usePlaceToDisplay = () =>{
    const[placeTab, setPlacesTab] = useState<Array<Place>>([])

    useEffect(()=>{
        placeService.updatePlace('/place/669f589f75435542ceef47ea')
        const placesToDisplay = placeStore.places$().subscribe((newPlacesTab) => {
            setPlacesTab([...newPlacesTab])
        })

        return(() => {placesToDisplay.unsubscribe()})
    },[])

    return { placeTab }
}