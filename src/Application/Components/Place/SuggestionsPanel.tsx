import { useEffect } from "react"
import { usePlaceToDisplay } from "../../../Module/Place/Place.hook"
import { Place } from "../../../Module/Place/Place.class"
import { PlaceDisplayLittleCard } from "../../ComplexeComponents/Places/PlaceDisplayLittleCards"
import { Loader } from "@mantine/core"

type suggestionPanelProps = {
    dataOnePlace:Place
} 

export const SuggestionsPanel:React.FC<suggestionPanelProps> = (props) => {
    const { placeToDisplay, updatePlaceToDisplay } = usePlaceToDisplay()

    useEffect(()=>{
        updatePlaceToDisplay("/suggestions",{latCoordinate : props.dataOnePlace.getLatCoordinate(), lonCoordinate: props.dataOnePlace.getLonCoordinate()})
    },[props.dataOnePlace])

    return(
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
                <h2 className="font-bold uppercase"> Activités aux alentours</h2>
                <div className="flex gap-3">
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
            <div className="flex flex-col gap-3">
                <h2 className="font-bold uppercase"> Hôtels aux alentours</h2>
                <div className="flex gap-3">
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
            <div className="flex flex-col gap-3">
                <h2 className="font-bold uppercase"> Restaurant aux alentours</h2>
                <div className="flex gap-3">
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
    )
}