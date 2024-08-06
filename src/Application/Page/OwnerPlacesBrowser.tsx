import { useEffect, useState } from "react"
import { SearchBar } from "../Components/General/SearchBar"
import { SelectorNavLink } from "../Components/General/SelectorNavLink"
import { Place } from "../../Module/Place/Place.class"
import { placeService, PlaceServices } from "../../Module/Place/Place.services"
import { Loader, Modal, Pagination } from "@mantine/core"
import { ResultSearchCard } from "../ComplexeComponents/Search/ResultSearchCard"
import { Button } from "../Components/General/Button"
import { AxiosResponse } from "axios"
import { useDisclosure } from "@mantine/hooks"

export const OwnerPlacesBrowser:React.FC = () => {

    const [placesTab, setPlacesTab] = useState<Array<Place>>()
    const [totalOfPlace, setTotalOfPlace] = useState<number>()
    const [openedConfirmationDeletionPlace, manageConfirmationDeletionPlace] = useDisclosure()
    const [page, setPage] = useState<number>(1)

    useEffect(()=>{
        async function getDataFromSearch(){
            const places = await placeService.getManyPlaceSearch(`/places/?user_id=${JSON.parse(sessionStorage.getItem("UserAuthentifiate")as string).data._id }&page=${page}&limit=4`)
            setPlacesTab(places.places as Array<Place>)
            setTotalOfPlace(places.total)
            
        }
        getDataFromSearch()
    },[page])

    function changePage(page:number){
        setPage(page)
    }

    const [nameForDeletion, setNameForDeletion] = useState<string>("")
    let [idForDeletion , setIdForDeletion] = useState<string>("")

    function openConfirmationPlace(name:string, id:string){
        manageConfirmationDeletionPlace.open()
        setNameForDeletion(name),
        setIdForDeletion(id)
    }

    async function deleteOnePlace(id:string){
        const response: AxiosResponse = await PlaceServices.deleteOnePlace(id)

        if(response.status === 200){
            window.alert("la suppression s'est correctement déroulée")
            window.location.reload()
        }else{
            window.alert("un problème est survenu lors de la suppression")
        }
    }

    return(
        <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-3 w-full">
                <div className="flex">
                    <SelectorNavLink to="/index/user/places" selected={true}>Mes établissements</SelectorNavLink>
                    <SelectorNavLink to="" selected={false}>Mes commentaires</SelectorNavLink>
                </div>
                <SearchBar/>
            </div>
            <div className="flex flex-col gap-5 w-full">
                {placesTab ? placesTab.map((place,index) => {
                    return <div className="flex items-center gap-3">
                        <ResultSearchCard key={index} place={place}/>
                        <Button onClick={()=>{openConfirmationPlace(place.getName(), place.getId())}}>supprimer</Button>
                        </div>
                }):<Loader />}
            </div>
            <Modal
                opened={openedConfirmationDeletionPlace}
                onClose={manageConfirmationDeletionPlace.close}
                centered
                overlayProps={{
                    backgroundOpacity:0.30,
                    color:'#D98D30',
                    blur:3,
                }}
                >
                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-bold text-red-500">Attention!</h3>
                        <div className="flex flex-col gap-1">
                            <p>Vous allez effectuer une action irréversible</p>
                            <p>{`Etes-vous sûr de vouloir supprimer le lieu : ${nameForDeletion}?`}</p>
                        </div>
                            <p>Voulez-vous continuer?</p>
                        <div className="flex justify-between">
                            <Button onClick={manageConfirmationDeletionPlace.close}>Annuler</Button>
                            <Button onClick={()=>{deleteOnePlace(idForDeletion)}}>Confirmer</Button>
                        </div>
                    </div>
                </Modal>
            <Pagination 
                total={totalOfPlace ? Math.ceil(totalOfPlace/4) : 1}
                color={"#8C3616"}
                value={page}
                onChange={(value:number) => changePage(value)}
                onNextPage={() => changePage(page+1)}
                onPreviousPage={() => changePage(page-1)} />
        </div>
    )
}