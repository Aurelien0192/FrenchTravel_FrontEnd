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

export const PlacePage:React.FC = () => {
    const {id} = useParams<string>()

    const AuthentifiateUser = useAuthentification()

    const [dataOnePlace, setDataOnePlace] = useState<Place>()
    const [photoOpen, photoOpenController] = useDisclosure()
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
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold">{dataOnePlace.getName()}</h1>
                                <p>{`${dataOnePlace.getCountry()} > ${dataOnePlace.getCounty()} > ${dataOnePlace.getCity()}`}</p>
                                <Button size="xs">contact</Button>
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