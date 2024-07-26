import { useState } from "react"
import { SearchBar } from "../../Components/General/SearchBar"
import { SelectorButton } from "../../Components/General/SelectorButton"
import { useSearchFilter } from "../../../Module/SearchFilter/SearchFilter.hook"
import { searchFilterServices } from "../../../Module/SearchFilter/SearchFilter.service"
import { searchFilter } from "../../../Module/SearchFilter/SearchFilter.type"

const Categories:Array<string> = ["Tout Rechercher","Hôtels","Restaurants","Activités"]




export const SearchPlacesManagement: React.FC = () => {

    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [categorieChoice, setCategoryChoice] = useState<string>("Tout Rechercher")
    const {searchFilter} = useSearchFilter()

    function changeSelected(newSelect: number){
        setCategoryChoice(Categories[newSelect])
        setSelectedIndex(newSelect)
    }

    function searchPlaces(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const searchOption:searchFilter = JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries())))

        switch(categorieChoice){
            case "Hôtels" :
                searchOption.categorie = "hotel"
                break;
            case "Restaurants":
                searchOption.categorie = "restaurant"
                break;
            case "Activités":
                searchOption.categorie = "activity"
                break;
        }
        
        searchFilterServices.addSearchFilter(searchOption) 
    }

    console.log(searchFilter)
   

    return(
        <div className=" w-9/12 flex flex-col gap-[6px]">
            <div>
                {Categories.map((category, index) => {return(
                    <SelectorButton key={index} onClick={() => {changeSelected(index)}} selected={index === selectedIndex ? true: false}>{category}</SelectorButton>
                )})}
            </div>
            <SearchBar onSubmit={(e) => {searchPlaces(e)}} />
        </div>
    )
}