import { SearchBar } from "../Components/General/SearchBar"
import { SelectorNavLink } from "../Components/General/SelectorNavLink"
import { Pagination } from "@mantine/core"
import { ResultSearchCard } from "../ComplexeComponents/Search/ResultSearchCard"
import { Button } from "../Components/General/Button"
import { useOwnerPlacesBrowser } from "../../Module/OwnerPlacesBrowser/OwnerPlacesBrowser.hook"
import { OwnerPlacesBrowserServices } from "../../Module/OwnerPlacesBrowser/OwnerPlacesBrowser.services"
import { FrenchTravelAnimated } from "../Components/svg/FrenchTravelAnimated"
import { CustomModal } from "../Components/General/CustomModal"

export const OwnerPlacesBrowser:React.FC = () => {

    const {placesTab, totalOfPlace, nameForDeletion, idForDeletion, openedConfirmationDeletionPlace, manageConfirmationDeletionPlace, page, changePage, openConfirmationPlace, changeValueOfSearch } = useOwnerPlacesBrowser()

    return(
        <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col md:flex-row gap-3 w-full">
                <div className="flex flex-col md:flex-row">
                    <SelectorNavLink to="/index/user/profile" selected={true}>Mes établissements</SelectorNavLink>
                    <SelectorNavLink to="/index/user/comment" selected={false}>Mes commentaires</SelectorNavLink>
                </div>
                <SearchBar onSubmit={(e)=>{e.preventDefault();changeValueOfSearch(JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))).search)}} placeholder="Rechercher un établissement"/>
            </div>
            <div className="flex flex-col gap-5 w-full">
                {placesTab ? 
                placesTab.length>0?
                placesTab.map((place,index) => {
                    return( 
                        <div key={index} className="flex flex-col md:flex-row items-center gap-3">
                            <ResultSearchCard  place={place}/>
                            <Button onClick={()=>{openConfirmationPlace(place.getName(), place.getId())}}>supprimer</Button>
                        </div>)
                }):<p className="w-full text-center font-bold mt-20">Vous n'avez enregistrer aucun établissement</p>:
                <div className="flex justify-center mt-24">
                    <FrenchTravelAnimated />
                </div>}
            </div>
            <CustomModal opened={openedConfirmationDeletionPlace} onClose={manageConfirmationDeletionPlace.close}>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-bold text-red-500">Attention!</h3>
                        <div className="flex flex-col gap-1">
                            <p>Vous allez effectuer une action irréversible</p>
                            <p>{`Etes-vous sûr de vouloir supprimer le lieu : ${nameForDeletion}?`}</p>
                        </div>
                            <p>Voulez-vous continuer?</p>
                        <div className="flex justify-between">
                            <Button onClick={manageConfirmationDeletionPlace.close}>Annuler</Button>
                            <Button onClick={()=>{OwnerPlacesBrowserServices.deleteOnePlace(idForDeletion)}}>Confirmer</Button>
                        </div>
                    </div>
                </CustomModal>
            <Pagination 
                total={totalOfPlace ? Math.ceil(totalOfPlace/4) : 1}
                hidden={totalOfPlace===0}
                color={"#8C3616"}
                value={page}
                onChange={(value:number) => changePage(value)}
                onNextPage={() => changePage(page+1)}
                onPreviousPage={() => changePage(page-1)} />
        </div>
    )
}