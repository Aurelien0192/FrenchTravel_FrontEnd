import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Place } from "../../Module/Place/Place.class"
import { PlaceServices } from "../../Module/Place/Place.services"
import { Loader, Modal } from "@mantine/core"
import { Button } from "../Components/General/Button.tsx"
import { Carroussel } from "../ComplexeComponents/Image/Carroussel"
import { PhotosManagement } from "../ComplexeComponents/Image/PhotosManagement.tsx"
import { useDisclosure } from "@mantine/hooks"
import { useImageManagement } from "../../Module/ImageManagement.ts/ImageManagement.hook"
import { AxiosServices } from "../../Module/HTTP/axios.services"
import { MoreInfoActivity } from "../ComplexeComponents/Places/MoreInfoActivity.tsx"
import { MoreInfoHotel } from "../ComplexeComponents/Places/MoreInfoHotel.tsx"
import { MoreInfoRestaurant } from "../ComplexeComponents/Places/MoreInfoRestaurant.tsx"
import { HeaderPlacePage } from "../Components/Place/HeaderPlacePage.tsx"
import { SuggestionsPanel } from "../Components/Place/SuggestionsPanel.tsx"

export const PlacePage:React.FC = () => {
    const {id} = useParams<string>()

    const [dataOnePlace, setDataOnePlace] = useState<Place>()
    const [photoOpen, photoOpenController] = useDisclosure()
    const {filesTab} = useImageManagement()

    
    useEffect(() => {
        const getPlace = async () => {
            const dataPlace: Place = await PlaceServices.getOnePlace(`/place/${id}`)
            setDataOnePlace(dataPlace)
        }
        getPlace()
    },[id])

    if(dataOnePlace){
        return(
            <div className="flex flex-col gap-14">
                <div className="flex flex-col gap-11">
                        <HeaderPlacePage dataOnePlace={dataOnePlace} />
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-4">
                            <p className="w-[700px] mr-5">{dataOnePlace.getDescribe()}</p>
                            {dataOnePlace.getCategorie()==="activity" && 
                                <MoreInfoActivity moreInfos={dataOnePlace.getMoreInfo()}  /> 
                            }
                        </div>
                        <div className="flex flex-col gap-4 items-end">
                            <Carroussel imagesTab={dataOnePlace.getImage()}/>
                            {sessionStorage.getItem("UserAuthentifiate") && <Button onClick={photoOpenController.open} size="md">Ajouter des Photos</Button>}
                        </div>
                    </div>
                    <Modal
                        opened={photoOpen}
                        onClose={photoOpenController.close}
                        centered
                        size={"xl"}
                        overlayProps={{
                            backgroundOpacity:0.30,
                            color:'#D98D30',
                            blur:3,
                        }}>
                        <div className="flex flex-col gap-3">
                            <PhotosManagement />
                            <Button size="md" onClick={() => {AxiosServices.postImages(filesTab as Array<File>,dataOnePlace.getId())}}>Valider</Button>
                        </div>
                    </Modal>
                </div>
                <div>
                    {dataOnePlace.getCategorie() !== "activity" &&
                        <div className="flex flex-col gap-4"> 
                            <h2 className="text-2xl font-bold">Infos pratiques</h2>
                            {
                                dataOnePlace.getCategorie() ==="hotel" ? 
                                    <MoreInfoHotel moreInfos={dataOnePlace.getMoreInfo()} /> :
                                    <MoreInfoRestaurant moreInfo={dataOnePlace.getMoreInfo()} />
                            }
                        </div>
                        }
                </div>
                <SuggestionsPanel dataOnePlace={dataOnePlace} />
            </div>
        )
    }else{
        <div>
            <Loader />
        </div>
    }
}