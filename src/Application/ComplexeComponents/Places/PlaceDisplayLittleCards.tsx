import { Comment } from "../../../Module/Comment/comment.class"
import { Place } from "../../../Module/Place/Place.class"
import { NavLink } from "react-router-dom"
import { HotelCategorieOrNoteShow } from "./HotelCategorieOrNotationShow"
import { image } from "../../../Module/Image/Image.type"
import noPhoto from "../../../../public/jpg/noPhoto.jpg"

type propsPlaceDisplayLittleCard = {
    place: Place
    type?:"little"
}

export const PlaceDisplayLittleCard:React.FC<propsPlaceDisplayLittleCard> = (props) =>{

    const comment: Comment|null = props.place.getComment() ? props.place.getComment() : null
    const images: Array<image>|null = props.place.getImage()
    return(
        <NavLink to={`/index/Place/${props.place.getId()}`} className= {`flex flex-col gap-2 shadow-md hover:shadow-lg rounded-xl ${props.type!=="little" ?"w-[377px] md:w-full h-[400px]":"w-[281px] h-[186px]"} p-[10px]`}>
            <div className={`relative flex ${props.type !=="little"?"h-64" : "h-full"}`}>
                <img className="rounded-xl object-cover size-full" src={images ? images[0].path : noPhoto} />
                <p className={`!m-0 px-4 py-2 w-full rounded-b-xl absolute bottom-0 ${props.type !== "little"? "text-2xl" :"text-xl"} font-bold text-white bg-gradient-to-t from-black`}
                >{props.place.getName()}</p>
            </div>
            {props.type!=="little" && 
                <div className="flex flex-col justify-between h-28">
                    <div className="flex gap-2 items-center">
                        <HotelCategorieOrNoteShow categorie={props.place.getNotation()} type="circle" />
                        <p>{props.place.getNumberOfNote()}</p>
                    </div>
                    <p className="font-bold">{props.place.getCity()}</p>
                    {comment?
                    <div className="flex flex-col">
                        <div className="flex gap-2.5 items-center">
                            <img className="size-10 rounded-full object-cover" src={comment.getProfilePhoto()} />
                            <p className="text-sm font-bold">{comment.getUsernamePoster()}</p>
                        </div>
                        <p className="text-sm h- italic text-wrap h-10 overflow-hidden">{comment.getComment()}</p>
                    </div>:
                    <p>Aucun commentaire trouvé</p>
                    }
                </div>
            }
        </NavLink>
    )
}