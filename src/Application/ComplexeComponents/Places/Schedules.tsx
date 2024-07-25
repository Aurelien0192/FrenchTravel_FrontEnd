/* composant permettant l'affichage du formulaires des horaires lorsque la catégorie activité est sélectionnée dans la page AddPlace.*/

import { DoubleInput } from "../../Components/General/DoubleInput"

export const Schedules:React.FC = () => {
    return(
        <label className="flex flex-col gap-2">
            Horaires
            <DoubleInput placeholder={["8:00","18:00"]} label="Lundi" name={["mondayOpen","mondayClose"]}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Mardi" name={["tuesdayOpen","tuesdayClose"]}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Mercredi" name={["wednesdayOpen","wednesdayClose"]}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Jeudi" name={["thursdayOpen","thursdayClose"]}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Vendredi" name={["fridayOpen","fridayClose"]}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Samedi" name={["saturdayOpen","saturdayClose"]}/>
            <DoubleInput placeholder={["8:00","18:00"]} label="Dimanche" name={["sundayOpen","sundayClose"]}/>
        </label>
    )
}