/* composant permettant l'affichage dynamique de la partie info supplémentaire dans la page AddPlace
En fonction de la catégorie sélectionnée par l'utilisateur (fourni par la propriété categorie), les champs disponibles vont être différents :
    - si restaurant, affichage des champs : price1, price2, cook et services 
    - si hotel, affichage des champs : accessibility, equipment et services
    - si activité, affichage des champs : schedules et duration*/

import { DoubleInput } from "../../Components/General/DoubleInput"
import { Input } from "../../Components/General/Input"
import { TextArea } from "../../Components/General/TextArea"
import { SelectInput } from "../../Components/General/SelectInput"
import { Schedules } from "./Schedules"
import { HotelCategorieSelector } from "./HotelCategorieSelector"

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
                <HotelCategorieSelector/>
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
                        value: 420
                    },{
                        name: "la journée",
                        value: 480
                    },{
                        name: "1 jour et demi",
                        value: 480 + 240
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