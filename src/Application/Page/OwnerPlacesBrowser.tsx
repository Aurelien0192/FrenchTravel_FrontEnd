import { SearchBar } from "../Components/General/SearchBar"
import { SelectorNavLink } from "../Components/General/SelectorNavLink"
import { Loader, Modal, Pagination } from "@mantine/core"
import { ResultSearchCard } from "../ComplexeComponents/Search/ResultSearchCard"
import { Button } from "../Components/General/Button"
import { useOwnerPlacesBrowser } from "../../Module/OwnerPlacesBrowser/OwnerPlacesBrowser.hook"
import { OwnerPlacesBrowserServices } from "../../Module/OwnerPlacesBrowser/OwnerPlacesBrowser.services"

export const OwnerPlacesBrowser:React.FC = () => {

    const {placesTab, totalOfPlace, nameForDeletion, idForDeletion, openedConfirmationDeletionPlace, manageConfirmationDeletionPlace, page, changePage, openConfirmationPlace } = useOwnerPlacesBrowser()

    return(
        <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-3 w-full">
                <div className="flex">
                    <SelectorNavLink to="/index/user/profile" selected={true}>Mes établissements</SelectorNavLink>
                    <SelectorNavLink to="/index/user/comment" selected={false}>Mes commentaires</SelectorNavLink>
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
                            <Button onClick={()=>{OwnerPlacesBrowserServices.deleteOnePlace(idForDeletion)}}>Confirmer</Button>
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