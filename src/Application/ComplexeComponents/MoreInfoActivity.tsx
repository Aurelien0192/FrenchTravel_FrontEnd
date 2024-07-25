import { IoTimeOutline } from "react-icons/io5"
import { moreInfo } from "../../Module/Place/Place.type"

type MoreInfoActivityProps = {
    moreInfos : moreInfo
}

const daysName:Array<String> = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]


export const MoreInfoActivity:React.FC<MoreInfoActivityProps> = (props) => {
    return(
        <div className="flex gap-5 items-center">
            <div className="flex flex-col gap-2">
                <p className="font-bold"> Horaire d'ouverture</p>
                <ul>
                    {daysName.map((dayName,index) => {
                        return(
                            <li className=" flex justify-between w-48">
                                <p>{dayName}</p>
                                <p>{props.moreInfos.schedules ?
                                        props.moreInfos.schedules[index].open.length> 0 ?
                                            `${props.moreInfos.schedules[index].open} - ${props.moreInfos.schedules[index].open}`:
                                            'non renseigné':
                                        'non renseigné'
                                    }
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="flex gap-4">
                <IoTimeOutline size={"25px"}/>
                <div className="flex gap-1">
                    <p> Durée de visite conseillée : </p>
                    {props.moreInfos.duration? 
                        props.moreInfos.duration>0 ?
                        `${props.moreInfos.duration/60} heure${props.moreInfos.duration/60>1?"s":""}`:
                        "non défini":
                        "non défini"
                    }
                </div>
            </div>
        </div>
    )
}