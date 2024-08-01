/* composant présent dans l'ajout d'un nouveau lieu
pour chaque catégorie d'hotel existante (présent dans le tableau categorieHotel), génération d'une étoile en lui fournissant sa catégorie.
Lorsque qu'une étoile est sélectionnée, selected du custom hook useCategorieSelector passe à true, changeant le comportement des étoiles.
*/

import { StarHotel } from "../../Components/Place/StarsHotel"
import { useCategorieSelector } from "../../../Module/HotelCategorieSelector/HotelCategorieSelector.hook"
import { hotelCategorieService } from "../../../Module/HotelCategorieSelector/HotelCategorieSelector.services"
import { useEffect } from "react"

type hotelCategorieSelectorProps = {
    labelHidden?: boolean
    selected?: boolean
    categorie?:number
}

export const HotelCategorieSelector: React.FC<hotelCategorieSelectorProps> = (props) => {
    const categorieHotel = [1,2,3,4,5]
    const {hotelCategorieSelected,categorieSelected} = useCategorieSelector()

    useEffect(() => {
        if(props.selected && props.categorie){
            categorieSelected()
            hotelCategorieService.changehotelCategorie(props.categorie)
        }
    },[])

    return(
        <div className="flex gap-2 justify-between items-center">
            {!props.labelHidden && <p>Categorie d'hôtel</p>}
            <div className="flex gap-2 w-9/12">
                {categorieHotel.map((e,index) => {
                    return(<StarHotel 
                        key={index} 
                        selected={hotelCategorieSelected}
                        hisCategorie={e}
                        changeSelected={categorieSelected}
                        />)
                    })}
            </div>
        </div>
    )
}