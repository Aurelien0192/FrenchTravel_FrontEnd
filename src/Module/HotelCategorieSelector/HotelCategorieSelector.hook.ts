import { useEffect, useState } from "react"
import { hotelCategorieStore } from "./HotelCategorieSelector.store"

export const useCategorieSelector = () => {

    const[hotelCategorie, setHotelCategorie] = useState<number>(1)
    const[selected, setSelected] = useState<boolean>(false)

    useEffect(() => {
        const hotelCategorie = hotelCategorieStore.hotelCategorie$().subscribe((new_hotelCategorie)=> {
            setHotelCategorie(new_hotelCategorie)
        })
        return(()=> {hotelCategorie.unsubscribe()})
    },[])

    const categorieSelected = ():void => {
        setSelected(true)
    }
    return {hotelCategorie,selected,categorieSelected}
}