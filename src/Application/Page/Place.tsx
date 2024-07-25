import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Place } from "../../Module/Place/Place.class"
import { PlaceServices } from "../../Module/Place/Place.services"
import { Loader, Modal } from "@mantine/core"
import { TypePlaceLabel } from "../Components/TypePlaceLabel"
import { Button } from "../Components/Button"
import { Carroussel } from "../ComplexeComponents/Carroussel"
import { PhotosManagement } from "../ComplexeComponents/PhotosManagement"
import { useDisclosure } from "@mantine/hooks"
import { useImageManagement } from "../../Module/ImageManagement.ts/ImageManagement.hook"
import { AxiosServices } from "../../Module/HTTP/axios.services"
import { useAuthentification } from "../../Module/Authentification/authentification.hook.ts"
import { MoreInfoActivity } from "../ComplexeComponents/MoreInfoActivity.tsx"
import { useClickOutside } from "@mantine/hooks"

export const PlacePage:React.FC = () => {
    const {id} = useParams<string>()

    const AuthentifiateUser = useAuthentification()

    const [dataOnePlace, setDataOnePlace] = useState<Place>()
    const [photoOpen, photoOpenController] = useDisclosure()
    const [hiddenContact, setHiddenContact] = useState<boolean>(true)
    const ref = useClickOutside(() => setHiddenContact(true))
    const {filesTab} = useImageManagement()
    console.log(AuthentifiateUser)

    useEffect(() => {
        const getPlace = async () => {
            const dataPlace: Place = await PlaceServices.getOnePlace(`/place/${id}`)
            setDataOnePlace(dataPlace)
        }
        getPlace()
    },[])

    if(dataOnePlace){
        return(
            <div className="flex flex-col gap-14">
                <div className="flex flex-col gap-11">
                    <div>
                        <div className="flex relative justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold">{dataOnePlace.getName()}</h1>
                                <p>{`${dataOnePlace.getCountry()} > ${dataOnePlace.getCounty()} > ${dataOnePlace.getCity()}`}</p>
                                <Button onClick={() => setHiddenContact(false)} size="xs">contact</Button>
                            </div>
                            <div className="flex gap-3">
                                <TypePlaceLabel labelName={dataOnePlace.getCategorie()} />
                                {dataOnePlace.getTypeOfPlace().length> 0 && dataOnePlace.getTypeOfPlace().map((typeOfPlace) => {
                                    return(
                                        <div>
                                            { typeOfPlace.length > 0 && <TypePlaceLabel labelName={typeOfPlace} />}
                                        </div>
                                    )
                                })}
                            </div>
                            {!hiddenContact &&
                                <div className="absolute top-24 left-3 bg-white rounded-xl shadow-xl p-3" ref={ref}>
                                    <ul className="flex flex-col gap-3">
                                        <li className="flex gap-3">
                                            <p className="font-bold">Adresse : </p>
                                            <div className="flex flex-col items-end">
                                                <p>{dataOnePlace.getStreet()}</p>
                                                <p>{`${dataOnePlace.getCodePostal()} ${dataOnePlace.getCity()}`}</p>
                                            </div>
                                        </li>
                                        <li className="flex justify-between">
                                            <p className="font-bold">Téléphone : </p>
                                            <div className="flex flex-col items-end">
                                                <p>{dataOnePlace.getPhone().length>0 ? dataOnePlace.getPhone() : "non renseigné"}</p>
                                            </div>
                                        </li>
                                        <li className="flex justify-between">
                                            <p className="font-bold">E-mail : </p>
                                            <div className="flex flex-col items-end">
                                                <p>{dataOnePlace.getEmail().length>0 ? dataOnePlace.getEmail() : "non renseigné"}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
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
                    <h2 className="text-2xl font-bold">Infos pratiques</h2>
                </div>
            </div>
        )
    }else{
        <div>
            <Loader />
        </div>
    }
}