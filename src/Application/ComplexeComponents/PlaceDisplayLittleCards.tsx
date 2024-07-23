import { Loader } from "@mantine/core"
import { Place } from "../../Module/Place/Place.class"

type propsPlaceDisplayLittleCard = {
    place: Place
}

export const PlaceDisplayLittleCard:React.FC<propsPlaceDisplayLittleCard> = (props) =>{
    if(props.place){
    return(
        <div className=" flex flex-col gap-2 shadow rounded-xl w-[430px] h-[396px] p-[10px]">
            <div className="relative h-full">
                <img className="rounded-xl w-full h-full object-cover" src={"http://localhost:3001/"+props.place.getImage()[0].path} />
                <p className="px-4 py-2 absolute bottom-0 text-2xl font-bold text-white">{props.place.getName()}</p>
            </div>
            <div className="h-28">
                <p className="font-bold">{props.place.getCity()}</p>
                <p className="text-wrap truncate h-5/6 ">{props.place.getDescribe()}</p>
            </div>
        </div>
    )}else
    return(
        <div className="shadow rounded-xl w-[430px] h-[396px]">
            <Loader />
        </div>
    )
}