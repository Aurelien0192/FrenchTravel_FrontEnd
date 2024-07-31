import { StarHotel } from "../../Components/Place/StarsHotel"

type hotelCategorieShowProps = {
    categorie:number|undefined
}

export const HotelCategorieShow: React.FC<hotelCategorieShowProps> = (props) => {
    const categoriesHotel:Array<number> = [1,2,3,4,5]
    return(
        <div className="flex">
            {categoriesHotel.map((categoryHotel, index) => {
                return(
                    <StarHotel 
                        key={index}
                        hisCategorie={categoryHotel}
                        selected={true}
                        forcedCategory={props.categorie ? props.categorie : 1}
                    />
                )
            })}
        </div>
    )
}