import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Place } from "../../Module/Place/Place.class"
import { PlaceServices } from "../../Module/Place/Place.services"
import { Loader } from "@mantine/core"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"
import { TypePlaceLabel } from "../Components/TypePlaceLabel"
import { Button } from "../Components/Button"

export const PlacePage:React.FC = () => {
    const {id} = useParams<string>()

    const [dataOnePlace, setDataOnePlace] = useState<Place>()
    const [imagePosition, setImagePosition] = useState<number>(0)
    const [index, setIndex] = useState<number>(0)

    useEffect(()=> {
        setImagePosition(736*index)
        console.log(index)
    },[index])

    function indexUp(){
        if (dataOnePlace && index < dataOnePlace?.getImage().length-1)
            return setIndex(index + 1)
    }

    function indexDown(){
        if ( index > 0)
            return setIndex(index - 1)
    }

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
                <div className="flex justify-between">
                    <p className="w-[700px]">{dataOnePlace.getDescribe()}</p>
                    <div className="w-[776px] h-[407px]">
                    <div className="relative w-[776px] h-[407px] overflow-clip">
                        <div style={{
                            left:`-${imagePosition}px`,
                            transition : "left ease-in-out 0.5s"
                        }} 
                        className={`absolute flex gap-5 `}
                        >
                            {dataOnePlace.getImage().map((image) => {
                                return(
                                    <div className="w-[716px] h-[402px] rounded-xl">
                                        <img className=" rounded-xl object-cover size-full" src={image.path}></img>
                                    </div>
                                )
                            })}
                        </div>
                        <button className={`bg-sand rounded-full border-2 border-orange absolute top-[190px] ${index===0 && "opacity-50"}`} onClick={indexDown}>
                            <IoChevronBackOutline size={"35px"} color="#D98D30"/>
                        </button>
                        <button className={`bg-sand rounded-full border-2 border-orange absolute right-0 top-[190px] ${index=== dataOnePlace?.getImage().length-1 && "opacity-50"}`} onClick={indexUp}>
                            <IoChevronForwardOutline size={"35px"} color="#D98D30"/>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }else{
        <div>
            <Loader />
        </div>
    }
}