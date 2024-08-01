import { IoTimeOutline } from "react-icons/io5"
import { useAuthentification } from "../../../Module/Authentification/authentification.hook"
import { Button } from "../../Components/General/Button"
import { useDisclosure } from "@mantine/hooks"
import { Place } from "../../../Module/Place/Place.class"
import { moreInfo } from "../../../Module/Place/Place.type"
import { Modal } from "@mantine/core"
import { Schedules } from "./Schedules"
import { SelectInput } from "../../Components/General/SelectInput"
import { useState } from "react"
import { FormularServices } from "../../../Module/FormularGeneralServices/formularServices"
import { UpdateFormularPlaceService } from "../../../Module/UpdateFormular/UpdateFormularPlace.service"

type MoreInfoActivityProps = {
    dataOnePlace : Place
}

const daysName:Array<String> = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]

export const MoreInfoActivity:React.FC<MoreInfoActivityProps> = (props) => {

    const {authentifiateUser} = useAuthentification()
    const [udpateMoreInfo, udpateMoreInfoManager] = useDisclosure()
    const [msg, setMsg] = useState<string>("")

    const changeMsg = async (e:React.FormEvent<HTMLFormElement>) => {
      const newMsg = await FormularServices.addResponseOfServer(UpdateFormularPlaceService.handleSubmit(e, undefined, props.dataOnePlace!.getId()),"updatePlace")
      setMsg(newMsg)
    }

    const moreInfo: moreInfo|undefined = props.dataOnePlace.getMoreInfo()
    console.log(moreInfo.duration == 360)
    return(
        <div className="flex gap-5 items-center">
            <div className="flex flex-col gap-2">
                <p className="font-bold"> Horaire d'ouverture</p>
                <ul>
                    {daysName.map((dayName,index) => {
                        return(
                            <li key={index} className=" flex justify-between w-48">
                                <p>{dayName}</p>
                                <p>{moreInfo.schedules ?
                                        moreInfo.schedules[index].open.length> 0 ?
                                            `${moreInfo.schedules[index].open} - ${moreInfo.schedules[index].close}`:
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
                    {moreInfo.duration? 
                        moreInfo.duration>0 ?
                        `${moreInfo.duration/60} heure${moreInfo.duration/60>1?"s":""}`:
                        "non défini":
                        "non défini"
                    }
                </div>
            </div>
            {Object.keys(authentifiateUser).length>0 && props.dataOnePlace.getOwner() === authentifiateUser.getId() &&
                        <div>
                            <Button onClick={udpateMoreInfoManager.open} size="xs">Modifier</Button>
                            <Modal
                                opened={udpateMoreInfo}
                                onClose={udpateMoreInfoManager.close}
                                size="lg"
                                centered
                                overlayProps={{
                                    backgroundOpacity:0.30,
                                    color:'#D98D30',
                                    blur:3,
                                }}>
                                <form onSubmit={(e)=>{changeMsg(e)}} className="flex flex-col gap-3 items-end">
                                    <div className="w-full flex flex-col gap-3">
                                        <p>Horaire d'ouverture</p>
                                        <Schedules value={moreInfo.schedules}/>
                                        <SelectInput 
                                            label="Durée de visite" 
                                            name="duration"
                                            options={
                                                [{
                                                    name: "1 heure",
                                                    value: 60,
                                                    selected: moreInfo.duration == 60
                                                },
                                                {
                                                    name: "2 heures",
                                                    value: 120,
                                                    selected: moreInfo.duration == 120
                                                },{
                                                    name: "3 heures",
                                                    value: 180,
                                                    selected: moreInfo.duration == 180
                                                },{
                                                    name: "4 heures",
                                                    value: 240,
                                                    selected: moreInfo.duration == 240
                                                },{
                                                    name: "5 heures",
                                                    value: 300,
                                                    selected: moreInfo.duration == 300
                                                },{
                                                    name: "6 heures",
                                                    value: 360,
                                                    selected: moreInfo.duration == 360
                                                },{
                                                    name: "7 heures",
                                                    value: 480,
                                                    selected: moreInfo.duration == 480
                                                },{
                                                    name: "la journée",
                                                    value: 540,
                                                    selected: moreInfo.duration == 540
                                                },{
                                                    name: "1 jour et demi",
                                                    value: 540 + 240,
                                                    selected: moreInfo.duration == 540+240
                                                },{
                                                    name: "2 jours",
                                                    value: 60 * 16,
                                                    selected: moreInfo.duration == 60*16
                                                }
                                            ]} />
                                    </div>
                                    <Button size="xs" type="submit">Valider</Button>
                                    <p className="text-red-500">{msg}</p>
                                </form>
                            </Modal>
                        </div>
                    }
        </div>
    )
}