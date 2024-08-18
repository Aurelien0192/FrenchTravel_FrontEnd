import { useEffect, useState } from "react"
import { Place } from "../Place/Place.class"
import { placeService } from "../Place/Place.services"
import { useDisclosure } from "@mantine/hooks"

export const useOwnerPlacesBrowser = () => {

    const [placesTab, setPlacesTab] = useState<Array<Place>>()
    const [totalOfPlace, setTotalOfPlace] = useState<number>()
    const [nameForDeletion, setNameForDeletion] = useState<string>("")
    const [idForDeletion , setIdForDeletion] = useState<string>("")
    const [openedConfirmationDeletionPlace, manageConfirmationDeletionPlace] = useDisclosure()
    const [searchValue, setSearchValue] = useState<string>("")
    const [page, setPage] = useState<number>(1)

    useEffect(()=>{
        async function getDataFromSearch(){
            const places = await placeService.getManyPlaceSearch(`/places/?user_id=${JSON.parse(sessionStorage.getItem("UserAuthentifiate")as string).data._id }&page=${page}&limit=4&search=${searchValue}`)
            setPlacesTab(places.places as Array<Place>)
            setTotalOfPlace(places.total)
            
        }
        getDataFromSearch()
    },[page,searchValue])

    function changePage(page:number){
        setPage(page)
    }

    function openConfirmationPlace(name:string, id:string){
        manageConfirmationDeletionPlace.open()
        setNameForDeletion(name),
        setIdForDeletion(id)
    }

    function changeValueOfSearch(SearchValue:string){
        setSearchValue(SearchValue)
    }

    return {placesTab, totalOfPlace, nameForDeletion, idForDeletion, openedConfirmationDeletionPlace, manageConfirmationDeletionPlace, page, changePage, openConfirmationPlace, changeValueOfSearch}
}