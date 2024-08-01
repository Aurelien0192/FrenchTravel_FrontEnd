/* composant permettant l'affichage du formulaires des horaires lorsque la catégorie activité est sélectionnée dans la page AddPlace.*/

import { schedules } from "../../../Module/Place/Place.type"
import { DoubleInput } from "../../Components/General/DoubleInput"

type schedulesProps = {
    value?:Array<schedules>
}

export const Schedules:React.FC<schedulesProps> = (props) => {
    return(
        <label className="flex flex-col gap-2">
            Horaires
            <DoubleInput placeholder={["8:00","18:00"]} label="Lundi" name={["mondayOpen","mondayClose"]} value1={ props.value && props.value[0].open} value2={ props.value && props.value[0].close}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Mardi" name={["tuesdayOpen","tuesdayClose"]} value1={ props.value && props.value[1].open} value2={ props.value && props.value[1].close}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Mercredi" name={["wednesdayOpen","wednesdayClose"]} value1={ props.value && props.value[2].open} value2={ props.value && props.value[2].close}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Jeudi" name={["thursdayOpen","thursdayClose"]} value1={ props.value && props.value[3].open} value2={ props.value && props.value[3].close}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Vendredi" name={["fridayOpen","fridayClose"]} value1={ props.value && props.value[4].open} value2={ props.value && props.value[4].close}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Samedi" name={["saturdayOpen","saturdayClose"]} value1={ props.value && props.value[5].open} value2={ props.value && props.value[5].close}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Dimanche" name={["sundayOpen","sundayClose"]} value1={ props.value && props.value[6].open} value2={ props.value && props.value[6].close}/>
        </label>
    )
}