import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Place } from "../../Module/Place/Place.class"
import { PlaceServices } from "../../Module/Place/Place.services"
import { Button } from "../Components/General/Button.tsx"
import { Carroussel } from "../ComplexeComponents/Image/Carroussel"
import { PhotosManagement } from "../ComplexeComponents/Image/PhotosManagement.tsx"
import { useDisclosure } from "@mantine/hooks"
import { useImageManagement } from "../../Module/ImageManagement/ImageManagement.hook.ts"
import { AxiosServices } from "../../Module/HTTP/axios.services"
import { MoreInfoActivity } from "../ComplexeComponents/Places/MoreInfoActivity.tsx"
import { MoreInfoHotel } from "../ComplexeComponents/Places/MoreInfoHotel.tsx"
import { MoreInfoRestaurant } from "../ComplexeComponents/Places/MoreInfoRestaurant.tsx"
import { HeaderPlacePage } from "../ComplexeComponents/Places/HeaderPlacePage.tsx"
import { SuggestionsPanel } from "../ComplexeComponents/Places/SuggestionsPanel.tsx"
import { useAuthentification } from "../../Module/Authentification/authentification.hook.ts"
import { Input } from "../Components/General/Input.tsx"
import { TextArea } from "../Components/General/TextArea.tsx"
import { DoubleInput } from "../Components/General/DoubleInput.tsx"
import { HotelCategorieOrNotationSelector } from "../ComplexeComponents/Places/HotelCategorieOrNotationSelector.tsx"
import { moreInfo } from "../../Module/Place/Place.type.ts"
import { useSelector } from "../../Module/HotelCategorieOrNotationSelector/HotelCategorieSelectorOrNotation.hook.ts"
import { FormularServices } from "../../Module/FormularGeneralServices/formularServices.ts"
import { UpdateFormularPlaceService } from "../../Module/UpdateFormular/UpdateFormularPlace.service.ts"
import { CommentFormular } from "../ComplexeComponents/Places/CommentFormular.tsx"
import { CommentsViewer } from "../ComplexeComponents/Comment/CommentsViewer.tsx"
import { Comment } from "../../Module/Comment/comment.class.ts"
import { Like } from "../Components/svg/Like.tsx"
import { AxiosResponse } from "axios"
import { ScrollToTop } from "../../Module/Place/scrollToTop.ts"
import { FrenchTravelAnimated } from "../Components/svg/FrenchTravelAnimated.tsx"
import { CustomModal } from "../Components/General/CustomModal.tsx"

export const PlacePage:React.FC = () => {
    const {id} = useParams<string>()
    const {authentifiateUser} = useAuthentification()

    const [dataOnePlace, setDataOnePlace] = useState<Place>()

    const [photoOpen, photoOpenController] = useDisclosure()
    const [describeUpdate, describeUpdateManager] = useDisclosure()
    const [moreInfoUpdate, moreInfoUpdateManager] = useDisclosure()
    const [addCommentModal, addCommentModalManager] = useDisclosure()
    const {filesTab} = useImageManagement()
    const {selectedNoteOrHotelCategorie} = useSelector()
    const [msg, setMsg] = useState<string>("")

    const moreInfo: moreInfo|undefined = dataOnePlace?.getMoreInfo()
    
    useEffect(() => {
        const getPlace = async () => {
            const dataPlace: Place = await PlaceServices.getOnePlace(`/place/${id}`)
            setDataOnePlace(dataPlace)
        }
        getPlace()
    },[id])

    const changeMsg = async (e:React.FormEvent<HTMLFormElement>) => {
      const newMsg = await FormularServices.addResponseOfServer(UpdateFormularPlaceService.handleSubmit(e, selectedNoteOrHotelCategorie, dataOnePlace!.getId(),dataOnePlace!.getCategorie()),"updatePlace")
      setMsg(newMsg)
    }

    const postImages = async() => {
        const response: AxiosResponse = await AxiosServices.postImages(filesTab as Array<File>, dataOnePlace!.getId()) as AxiosResponse
        if(response.status === 201){
            window.location.reload()
        }else{
            setMsg(response.data)
        }
    }

    const comment: Comment|null = dataOnePlace ? dataOnePlace.getComment() ? dataOnePlace.getComment() : null : null

    if(dataOnePlace){
        return(
            <div className="flex flex-col gap-14">
                <ScrollToTop />
                <div className="flex flex-col gap-11">
                        <HeaderPlacePage dataOnePlace={dataOnePlace} />
                    <div className="flex flex-col-reverse lg:flex-row gap-9">
                        <div className="flex flex-col gap-4">
                            {comment &&
                                <div className="flex flex-col mb-4">
                                    <div className="flex gap-2.5 items-center w-full">
                                        <img className="size-10 rounded-full object-cover" src={comment.getProfilePhoto()} />
                                        <p className="text-sm font-bold">{comment.getUsernamePoster()}</p>
                                    </div>
                                    <p className="text-sm truncate italic text-wrap w-full h-10 overflow-hidden">{comment.getComment()}</p>
                                    <div className="flex gap-2 items-end">
                                        <p>{comment.getLike()}</p>
                                        <Like liked={comment.getLiked()} />
                                    </div>
                                </div>
                            }
                            <p className="mr-5">{dataOnePlace.getDescribe()}</p>
                            {Object.keys(authentifiateUser).length>0 && dataOnePlace.getOwner() === authentifiateUser.getId() &&
                                <div>
                                    <Button onClick={describeUpdateManager.open} size="xs">Modifier</Button>
                                    <CustomModal opened={describeUpdate} onClose={describeUpdateManager.close} size="lg">
                                        <form onSubmit={(e)=>{changeMsg(e)}} className="flex flex-col gap-3 items-end">
                                            <div className="w-full flex flex-col gap-3">
                                                <TextArea placeholder="Obligatoire" value={dataOnePlace.getDescribe()} size="md" name="describe" label="Description" flexDirection="flex-col"/>
                                            </div>
                                            <Button size="xs" type="submit">Valider</Button>
                                            <p className="text-red-500">{msg}</p>
                                        </form>
                                    </CustomModal>
                                </div>
                            }
                            {dataOnePlace.getCategorie()==="activity" && 
                                <MoreInfoActivity dataOnePlace={dataOnePlace} /> 
                            }
                        </div>
                        <div className="flex flex-col gap-4 items-center lg:items-end">
                            <Carroussel imagesTab={dataOnePlace.getImage()}/>
                            {sessionStorage.getItem("UserAuthentifiate") && <Button onClick={photoOpenController.open} size="md">Ajouter des Photos</Button>}
                        </div>
                    </div>
                    <CustomModal size="xl" zIndex={1000} opened={photoOpen} onClose={photoOpenController.close}>
                        <div className="flex flex-col gap-3">
                            <PhotosManagement />
                            <Button size="md" onClick={postImages}>Valider</Button>
                            {msg && <p className="text-red-500">{msg}</p>}
                        </div>
                    </CustomModal>
                </div>
                <div>
                    {dataOnePlace.getCategorie() !== "activity" &&
                        <div className="flex flex-col gap-4"> 
                            {Object.keys(authentifiateUser).length>0 && dataOnePlace.getOwner() === authentifiateUser.getId() &&
                                <div>
                                    <Button onClick={moreInfoUpdateManager.open} size="xs">Modifier</Button>
                                    <CustomModal zIndex={1000} opened={moreInfoUpdate} onClose={moreInfoUpdateManager.close} size="lg">
                                        <form onSubmit={(e)=>{changeMsg(e)}} className="flex flex-col gap-3 items-end">
                                            {dataOnePlace.getCategorie()==="restaurant"?
                                                <div className=" w-full flex flex-col gap-3">
                                                    <DoubleInput placeholder={["15","25"]} label="Fourchette de prix" name={["price1","price2"]} value1={moreInfo && moreInfo.price && moreInfo.price[0].toString()} value2={moreInfo && moreInfo.price && moreInfo.price[1].toString()}/>
                                                    <Input placeholder="Gastronomique, Epicée ..." label="Cuisine" name="cook" value={moreInfo && moreInfo.cook}/>
                                                    <TextArea placeholder="Réservations, chaise hautes..." label="Services" name="services" size="xs" value={moreInfo && moreInfo.services} />
                                                </div>
                                            :
                                                <div className="w-full flex flex-col gap-3">
                                                    <Input placeholder="Climatisation, Coffre-fort" label="Equipement" name="equipment" value={moreInfo && moreInfo.equipment} />
                                                    <Input placeholder="Ascenceur..." label="Accessibilité" name="accessibility" value={moreInfo && moreInfo.accessibility}/>
                                                    <HotelCategorieOrNotationSelector type="star" selected={true} categorie={moreInfo && moreInfo.hotelCategorie}/>
                                                    <TextArea placeholder="Réservations, chaise hautes..." label="Services" name="services" size="xs" value={moreInfo && moreInfo.services} />
                                                </div>
                                            }
                                            <Button size="xs" type="submit">Valider</Button>
                                            {msg && <p className="text-red-500">{msg}</p>}
                                        </form>
                                    </CustomModal>
                                </div>
                            }
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
                <div>
                    <h2 className="text-2xl font-bold">Avis</h2>
                    <div className="flex flex-col gap-4 items-start">
                        {Object.keys(authentifiateUser).length>0 &&  <Button size="xs" onClick={addCommentModalManager.open}>Ajouter un commentaire</Button>}
                        <CustomModal zIndex={1000} opened={addCommentModal} onClose={addCommentModalManager.close} size="xl">
                                <CommentFormular dataOnePlace={dataOnePlace} />
                        </CustomModal>
                        <CommentsViewer filter={true} visitor_id={Object.keys(authentifiateUser).length>0?authentifiateUser.getId():null} variant={1} findBy="place_id" idOfPlaceOrUser={dataOnePlace.getId()} />
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <FrenchTravelAnimated />
            </div>
        )
    }
}