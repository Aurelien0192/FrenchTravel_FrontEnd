import { useEffect } from "react"
import { usePlaceToDisplay } from "../../../Module/Place/Place.hook"
import { Place } from "../../../Module/Place/Place.class"
import { PlaceDisplayLittleCard } from "../../ComplexeComponents/Places/PlaceDisplayLittleCards"
import { Loader } from "@mantine/core"
import { InteractivMap } from "../../ComplexeComponents/Places/interactiveMap"

type suggestionPanelProps = {
    dataOnePlace:Place
} 

export const SuggestionsPanel:React.FC<suggestionPanelProps> = (props) => {
    const { placeToDisplay, updatePlaceToDisplay } = usePlaceToDisplay()

    useEffect(()=>{
        updatePlaceToDisplay("/suggestions",{latCoordinate : props.dataOnePlace.getLatCoordinate(), lonCoordinate: props.dataOnePlace.getLonCoordinate()})
    },[props.dataOnePlace])

    return(
        <div className="flex justify-between">
            <div className="flex flex-col md:w-[60lvw] gap-5">
                <div className="flex flex-col gap-3">
                    <h2 className="font-bold uppercase"> Activités aux alentours</h2>
                    <div className="w-[90lvw] overflow-auto pb-2 flex gap-3">
                        <div className="w-fit flex gap-3 ">
                            {placeToDisplay.activity ? 
                                placeToDisplay.activity.map((place, index) => {
                                    return(
                                        props.dataOnePlace.getId() !== place.getId() && <PlaceDisplayLittleCard key={index} place={place} type="little" />
                                    )
                                }):
                                <Loader />
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <h2 className="font-bold uppercase"> Hôtels aux alentours</h2>
                    <div className=" overflow-auto w-[90lvw] md:w-full pb-2 flex gap-3">
                        <div className="flex gap-3 box-content w-fit md:mx-3">
                            {placeToDisplay.hotel ? 
                                placeToDisplay.hotel.map((place, index) => {
                                    return(
                                        props.dataOnePlace.getId() !== place.getId() && <PlaceDisplayLittleCard key={index} place={place} type="little" />
                                    )
                                }):
                                <Loader />
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <h2 className="font-bold uppercase"> Restaurant aux alentours</h2>
                    <div className="w-[90lvw] overflow-auto pb-2 flex gap-3">
                        <div className="flex gap-3 w-fit">
                            {placeToDisplay.restaurant ? 
                                placeToDisplay.restaurant.map((place, index) => {
                                    return(
                                        props.dataOnePlace.getId() !== place.getId() && <PlaceDisplayLittleCard key={index} place={place} type="little" />
                                    )
                                }):
                                <Loader />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <InteractivMap placeData={props.dataOnePlace} suggestions={placeToDisplay} />
        </div>
    )
}