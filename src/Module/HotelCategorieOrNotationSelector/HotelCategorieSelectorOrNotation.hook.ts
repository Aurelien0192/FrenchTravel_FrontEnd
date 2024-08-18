import { useEffect, useState } from "react"
import { hotelCategorieOrNotationStore } from "./HotelCategorieSelectorOrNotation.store"

export const useSelector = () => {

    const[selectedNoteOrHotelCategorie, setSelectedNoteOrHotelCategorie] = useState<number>(1)                                      //hook permettant de garder en mémoire la catégorie d'hôtel sélectionné lors de la création d'un hôtel
    const[hotelCategorieOrNoteSelected, setHotelCategorieOrNoteSelected] = useState<boolean>(false)                                             //hook permettant de savoir si une catégorie d'hôtel à été sélectionné

    useEffect(() => {
        const hotelCategorieOrNotation = hotelCategorieOrNotationStore.hotelCategorieOrNotation$().subscribe((new_hotelCategorieOrNotation)=> { //subscribe pour hotelCategorie
            setSelectedNoteOrHotelCategorie(new_hotelCategorieOrNotation)
        })
        return(()=> {hotelCategorieOrNotation.unsubscribe()})
    },[])

    const categorieOrNoteSelected = ():void => {
        setHotelCategorieOrNoteSelected(true)
    }
    return {selectedNoteOrHotelCategorie,hotelCategorieOrNoteSelected,categorieOrNoteSelected}
}