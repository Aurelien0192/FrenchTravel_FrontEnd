import { Place } from "../../Module/Place/Place.class"
import { NavLink } from "react-router-dom"

type propsPlaceDisplayLittleCard = {
    place: Place
}

export const PlaceDisplayLittleCard:React.FC<propsPlaceDisplayLittleCard> = (props) =>{
    return(
        <NavLink to={`/index/Place/${props.place.getId()}`} className=" flex flex-col gap-2 shadow rounded-xl w-full h-[396px] p-[10px]">
            <div className="relative h-64">
                <img className="rounded-xl object-cover size-full" src={props.place.getImage()[0].path} />
                <p 
                    className="px-4 py-2 w-full rounded-b-xl absolute bottom-0 text-2xl font-bold text-white bg-gradient-to-t from-black"
                >{props.place.getName()}</p>
            </div>
            <div className="flex flex-col justify-between h-28">
                <p className="font-bold">{props.place.getCity()}</p>
                <p className="text-wrap truncate h-5/6 ">{props.place.getDescribe()}</p>
            </div>
        </NavLink>
    )
}