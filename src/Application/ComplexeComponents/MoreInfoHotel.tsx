import { IoTvSharp } from "react-icons/io5"
import { moreInfo } from "../../Module/Place/Place.type"
import { FaAccessibleIcon } from "react-icons/fa"
import service from './../../../public/Logo/service.svg'

type MoreInfoHotelProps = {
    moreInfos : moreInfo
}

export const MoreInfoHotel:React.FC<MoreInfoHotelProps> = (props) => {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col items-center gap-3 w-1/3">
                <div className="flex gap-2">
                    <IoTvSharp size={"30px"} />
                    <p className="font-bold">Equipements</p>
                </div>
                <div>
                    <p>{props.moreInfos.equipment ? 
                            props.moreInfos.equipment.length>0 ?
                            props.moreInfos.equipment : "non renseigné" :
                            "non renseigné"
                        }
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-3 w-1/3">
                <div className="flex gap-2">
                    <FaAccessibleIcon size={"30px"} />
                    <p className="font-bold">Accessibilités</p>
                </div>
                <div>
                    <p>{props.moreInfos.accessibility ? 
                            props.moreInfos.accessibility.length>0 ?
                            props.moreInfos.accessibility : "non renseigné" :
                            "non renseigné"
                        }
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-3 w-1/3">
                <div className="flex gap-2">
                    <img src={service}/>
                    <p className="font-bold">Accessibilités</p>
                </div>
                <div>
                    <p>{props.moreInfos.services ? 
                            props.moreInfos.services.length>0 ?
                            props.moreInfos.services : "non renseigné" :
                            "non renseigné"
                        }
                    </p>
                </div>
            </div>

        </div>
    )
}