import { DoubleInput } from "../Components/DoubleInput"
import { Input } from "../Components/Input"
import { TextArea } from "../Components/TextArea"
import { SelectInput } from "../Components/SelectInput"
import { Schedules } from "./Schedules"

type supplementaryInfo = {
    categorie:string
}

export const SupplementaryInfo:React.FC<supplementaryInfo> = (props) => {
    if(props.categorie==="restaurant"){
        return(
            <div className="flex flex-col gap-6">
                <p className="text-end">Infos supplémentaires</p>
                <DoubleInput placeholder={["15","25"]} label="Fourchette de prix" name={["price1","price2"]}/>
                <Input placeholder="Gastronomique, Epicée ..." label="Cuisine" name="cook"/>
                <TextArea placeholder="Réservations, chaise hautes..." label="Services" name="services" size="xs" />
            </div>
        )
    }else if(props.categorie==="hotel"){
        return(
            <div className="flex flex-col gap-6">
                <p className="text-end">Infos supplémentaires</p>
                <Input placeholder="Climatisation, Coffre-fort" label="Equipement" name="equipment" />
                <Input placeholder="Ascenceur..." label="Accessibilité" name="accessibility"/>
                <TextArea placeholder="Réservations, chaise hautes..." label="Services" name="services" size="xs" />
            </div>
        )
    }else{
        return(
            <div className="flex flex-col gap-6">
                <p className="text-end">Infos supplémentaires</p>
                <SelectInput 
                label="Durée de visite" 
                name="duration"
                options={
                    [{
                        name: "1 heure",
                        value: 60
                    },
                    {
                        name: "2 heures",
                        value: 120
                    },{
                        name: "3 heures",
                        value: 180
                    },{
                        name: "4 heures",
                        value: 240
                    },{
                        name: "5 heures",
                        value: 300
                    },{
                        name: "6 heures",
                        value: 360
                    },{
                        name: "7 heures",
                        value: 480
                    },{
                        name: "la journée",
                        value: 540
                    },{
                        name: "1 jour et demi",
                        value: 540 + 240
                    },{
                        name: "2 jours",
                        value: 60 * 16
                    }
                ]} />
                <Schedules/>
            </div>
        )
    }
}