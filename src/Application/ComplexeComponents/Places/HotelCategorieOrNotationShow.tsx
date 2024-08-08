import { StarHotelAndNote } from "../../Components/Place/StarsHotelOrCircleNotation"

type hotelCategorieOrNoteShowProps = {
    categorie:number|undefined
    type:"star"|"circle"
}

export const HotelCategorieOrNoteShow: React.FC<hotelCategorieOrNoteShowProps> = (props) => {
    const categoriesHotelOrNotation:Array<number> = [1,2,3,4,5]
    return(
        <div className="flex items-center">
            {categoriesHotelOrNotation.map((categoryHotelOrNotation, index) => {
                return(
                    <StarHotelAndNote 
                        key={index}
                        hisCategorie={categoryHotelOrNotation}
                        selected={true}
                        forcedCategory={props.categorie ? props.categorie : 1}
                        type={props.type}
                    />
                )
            })}
        </div>
    )
}