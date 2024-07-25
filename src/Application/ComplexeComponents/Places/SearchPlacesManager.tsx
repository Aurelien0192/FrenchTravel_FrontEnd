import { useState } from "react"
import { SearchBar } from "../../Components/General/SearchBar"
import { SelectorButton } from "../../Components/General/SelectorButton"

const Categories:Array<string> = ["Tout Rechercher","Hôtels","Restaurants","Activités"]




export const SearchPlacesManagement: React.FC = () => {

    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [categorieChoice, setCategoryChoice] = useState<string>("Tout Rechercher")

    function changeSelected(newSelect: number){
        setCategoryChoice(Categories[newSelect])
        setSelectedIndex(newSelect)
    }

   

    return(
        <div className=" w-9/12 flex flex-col gap-[6px]">
            <div>
                {Categories.map((category, index) => {return(
                    <SelectorButton key={index} onClick={() => {changeSelected(index)}} selected={index === selectedIndex ? true: false}>{category}</SelectorButton>
                )})}
            </div>
            <SearchBar categorie={categorieChoice} />
        </div>
    )
}