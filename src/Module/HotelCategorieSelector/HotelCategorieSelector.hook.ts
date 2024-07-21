import { useEffect, useState } from "react"
import { hotelCategorieStore } from "./HotelCategorieSelector.store"

export const useCategorieSelector = () => {

    const[hotelCategorie, setHotelCategorie] = useState<number>(1)                                      //hook permettant de garder en mémoire la catégorie d'hôtel sélectionné lors de la création d'un hôtel
    const[selected, setSelected] = useState<boolean>(false)                                             //hook permettant de savoir si une catégorie d'hôtel à été sélectionné

    useEffect(() => {
        const hotelCategorie = hotelCategorieStore.hotelCategorie$().subscribe((new_hotelCategorie)=> { //subscribe pour hotelCategorie
            setHotelCategorie(new_hotelCategorie)
        })
        return(()=> {hotelCategorie.unsubscribe()})
    },[])

    const categorieSelected = ():void => {
        setSelected(true)
    }
    return {hotelCategorie,selected,categorieSelected}
}