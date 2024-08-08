/* composant présent dans l'ajout d'un nouveau lieu
pour chaque catégorie d'hotel existante (présent dans le tableau categorieHotel), génération d'une étoile en lui fournissant sa catégorie.
Lorsque qu'une étoile est sélectionnée, selected du custom hook useCategorieSelector passe à true, changeant le comportement des étoiles.
*/

import { StarHotelAndNote } from "../../Components/Place/StarsHotelOrCircleNotation"
import { useSelector } from "../../../Module/HotelCategorieOrNotationSelector/HotelCategorieSelectorOrNotation.hook"
import { hotelCategorieOrNotationService } from "../../../Module/HotelCategorieOrNotationSelector/HotelCategorieSelectorOrNotation.services"
import { useEffect } from "react"

type hotelCategorieSelectorProps = {
    labelHidden?: boolean
    selected?: boolean
    categorie?:number
}

export const HotelCategorieOrNotationSelector: React.FC<hotelCategorieSelectorProps> = (props) => {
    const categorieHotelOrNotation = [1,2,3,4,5]
    const {hotelCategorieOrNoteSelected,categorieOrNoteSelected} = useSelector()

    useEffect(() => {
        if(props.selected && props.categorie){
            categorieOrNoteSelected()
            hotelCategorieOrNotationService.changehotelCategorieOrNotation(props.categorie)
        }
    },[])

    return(
        <div className="flex gap-2 justify-between items-center">
            {!props.labelHidden && <p>Categorie d'hôtel</p>}
            <div className="flex gap-2 w-9/12">
                {categorieHotelOrNotation.map((e,index) => {
                    return(<StarHotelAndNote 
                        type="star"
                        key={index} 
                        selected={hotelCategorieOrNoteSelected}
                        hisCategorie={e}
                        changeSelected={categorieOrNoteSelected}
                        />)
                    })}
            </div>
        </div>
    )
}