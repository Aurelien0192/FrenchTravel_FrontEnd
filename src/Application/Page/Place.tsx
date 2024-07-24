import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Place } from "../../Module/Place/Place.class"
import { PlaceServices } from "../../Module/Place/Place.services"
import { Loader } from "@mantine/core"
import { TypePlaceLabel } from "../Components/TypePlaceLabel"
import { Button } from "../Components/Button"
import { Carroussel } from "../ComplexeComponents/Carroussel"

export const PlacePage:React.FC = () => {
    const {id} = useParams<string>()

    const [dataOnePlace, setDataOnePlace] = useState<Place>()

    useEffect(() => {
        const getPlace = async () => {
            const dataPlace: Place = await PlaceServices.getOnePlace(`/place/${id}`)
            setDataOnePlace(dataPlace)
        }
        getPlace()
    },[])

    if(dataOnePlace){

        return(
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
                <div>
                    <div className="flex justify-between">
                        <p className="w-[700px]">{dataOnePlace.getDescribe()}</p>
                        <Carroussel imagesTab={dataOnePlace.getImage()}/>
                    </div>
                    <Button size="md">Ajouter des Photos</Button>
                </div>
            </div>
        )
    }else{
        <div>
            <Loader />
        </div>
    }
}