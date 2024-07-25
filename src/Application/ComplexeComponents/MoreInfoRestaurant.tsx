import { moreInfo } from "../../Module/Place/Place.type"

type moreInfoRestaurantProps = {
    moreInfo : moreInfo
}

export const MoreInfoRestaurant:React.FC<moreInfoRestaurantProps> = (props) => {
    return(
        <div className="flex justify-between">
            <div className="w-1/2">
                <div>
                    <p className="font-bold">Fourchette de prix</p>
                    <p>{props.moreInfo.price ? props.moreInfo.price[0] ? 
                            props.moreInfo.price[0]>0 ? `${props.moreInfo.price[0]}€ - ${props.moreInfo.price[1]}€`: "Non renseigné"
                            :"Non renseigné":"Non renseigné"}
                    </p>
                </div>
                <div>
                    <p className="font-bold">Cuisine</p>
                    <p>{props.moreInfo.cook? props.moreInfo.cook : "Non renseigné"}</p>
                </div>
            </div>
            <div className="w-1/2">
                <p className="font-bold">Services</p>
                <p>{props.moreInfo.services? props.moreInfo.services : "Non renseigné"}</p>
            </div>
        </div>

    )
}