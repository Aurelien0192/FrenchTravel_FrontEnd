import { Place } from "../../../Module/Place/Place.class"
import { HotelCategorieOrNoteShow } from "../Places/HotelCategorieOrNotationShow"
import { TypePlaceLabel } from "../../Components/Place/TypePlaceLabel"
import { NavLink } from "react-router-dom"
import { Comment } from "../../../Module/Comment/comment.class"
import { Like } from "../../Components/svg/Like"

type resultSearchCardProps = {
    place : Place
}


export const ResultSearchCard:React.FC<resultSearchCardProps> = (props) => {
    const comment: Comment|null = props.place.getComment() ? props.place.getComment() : null

    return(
        <NavLink to={`/index/Place/${props.place.getId()}`} className="flex flex-col md:flex-row w-full shadow-md rounded-xl hover:bg-sand">
            <div className="w-64 h-[200px] hidden md:block">
                <img className=" size-full object-cover rounded-l-xl" src={props.place.getImage()[0].path}></img>
            </div>
            <div className=" flex flex-col gap-3 px-4 py-3 w-full">
                <div className="flex items-start justify-between md:block">
                    <div className=" w-[136px] h-[113px] md:hidden">
                        <img className=" w-[136px] h-[113px] object-cover rounded-l-xl" src={props.place.getImage()[0].path}></img>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row justify-between items-end md:items-start">
                        <div className="flex flex-col">
                            <div className=" flex flex-col md:flex-row gap-2.5 items-center">
                                <h2 className="md:text-2xl font-bold">{props.place.getName()}</h2>
                                <div className="flex gap-2 items-center">
                                    <HotelCategorieOrNoteShow type="circle" categorie={props.place.getNotation()} />
                                    <p>{props.place.getNumberOfNote()}</p>
                                </div>
                            </div>
                            <p className="text-sm">{`${props.place.getCity()}, ${props.place.getCounty()}, ${props.place.getCountry()}`}</p>
                            <div className="flex gap-2 items-center">
                        </div>
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
                    {comment?
                    <div className="flex flex-col">
                        <div className="flex gap-2 items-start">
                            <div className="flex gap-2.5 items-center">
                                <img className="size-10 rounded-full object-cover" src={comment.getProfilePhoto()} />
                                <p className="text-sm font-bold">{comment.getUsernamePoster()}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm h- italic truncate ... overflow-hidden">{comment.getComment()}</p>
                                <div className="flex gap-2 items-end">
                                    <p>{comment.getLike()}</p>
                                    <Like liked={comment.getLiked()} />
                                </div>
                            </div>
                        </div>
                    </div>:
                    <p>Aucun commentaire trouvé</p>
                    }
                </div>
            </div>
        </NavLink>
    )
}