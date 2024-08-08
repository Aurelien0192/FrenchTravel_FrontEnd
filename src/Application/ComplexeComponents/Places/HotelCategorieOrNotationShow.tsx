import { StarHotelAndNote } from "../../Components/Place/StarsHotelOrCircleNotation"

type hotelCategorieShowProps = {
    categorie:number|undefined
}

export const HotelCategorieShow: React.FC<hotelCategorieShowProps> = (props) => {
    const categoriesHotelOrNotation:Array<number> = [1,2,3,4,5]
    return(
        <div className="flex">
            {categoriesHotelOrNotation.map((categoryHotelOrNotation, index) => {
                return(
                    <StarHotelAndNote 
                        key={index}
                        hisCategorie={categoryHotelOrNotation}
                        selected={true}
                        forcedCategory={props.categorie ? props.categorie : 1}
                        type="star"
                    />
                )
            })}
        </div>
    )
}