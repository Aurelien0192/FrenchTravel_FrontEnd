import { Place } from "../../../Module/Place/Place.class"
import { HotelCategorieOrNoteShow } from "../Places/HotelCategorieOrNotationShow"
import { TypePlaceLabel } from "../../Components/Place/TypePlaceLabel"
import { NavLink } from "react-router-dom"

type resultSearchCardProps = {
    place : Place
}


export const ResultSearchCard:React.FC<resultSearchCardProps> = (props) => {

    return(
        <NavLink to={`/index/Place/${props.place.getId()}`} className="flex flex-col md:flex-row w-full shadow-md rounded-xl hover:bg-sand">
            <div className="w-56 h-[186px] hidden md:block">
                <img className=" size-full object-cover rounded-l-xl" src={props.place.getImage()[0].path}></img>
            </div>
            <div className=" flex flex-col gap-3 px-4 py-3 w-full">
                <div className="flex items-start justify-between md:block">
                    <div className=" w-[136px] h-[113px] md:hidden">
                        <img className=" w-[136px] h-[113px] object-cover rounded-l-xl" src={props.place.getImage()[0].path}></img>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row justify-between items-end md:items-center">
                        <div className="flex flex-col">
                            <h2 className="md:text-2xl font-bold">{props.place.getName()}</h2>
                            <p className="text-sm">{`${props.place.getCity()}, ${props.place.getCounty()}, ${props.place.getCountry()}`}</p>
                        </div>
                        <div className="flex gap-3">
                            <TypePlaceLabel labelName={props.place.getCategorie()} />
                            {props.place.getTypeOfPlace().length> 0 && props.place.getTypeOfPlace().map((typeOfPlace, index) => {
                                return(
                                    <div className="hidden md:block" key={index}>
                                        { typeOfPlace.length > 0 && <TypePlaceLabel labelName={typeOfPlace} />}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    {
                        props.place.getCategorie()==="hotel"?
                        <div className="flex gap-3">
                                <p>Categorie d'hôtel : </p>
                                <HotelCategorieOrNoteShow type="star" categorie={props.place.getMoreInfo().hotelCategorie} />
                            </div>
                        : props.place.getCategorie() ==="restaurant" ?
                        <div className="flex gap-3">
                                <p>Fourchette de prix : </p>
                                {props.place.getMoreInfo().price?<p>{`${props.place.getMoreInfo().price![0]}€ - ${props.place.getMoreInfo().price![1]}€`}</p>: <p>non renseigné</p>}
                            </div>
                        :props.place.getCategorie() ==="activity" ?
                        <div className="flex gap-3">
                                <p>Durée de visite : </p>
                                {props.place.getMoreInfo().duration? <p>{`${props.place.getMoreInfo().duration!/60} heures`}</p>:<p>non renseigné</p> }
                            </div>
                        :<p>Aucune données</p>
                    }
                </div>
            </div>
        </NavLink>
    )
}