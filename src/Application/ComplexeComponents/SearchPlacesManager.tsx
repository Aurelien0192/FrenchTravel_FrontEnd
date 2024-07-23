import { SearchBar } from "../Components/SearchBar"
import { SelectorButton } from "../Components/SelectorButton"

const Categories:Array<string> = ["Tout Rechercher","Hôtels","Restaurants","Activités"]

export const SearchPlacesManagement: React.FC = () => {
    return(
        <div className=" w-9/12 flex flex-col gap-[6px]">
            <div>
                {Categories.map((category, index) => {return(
                    <SelectorButton key={index} selected={index === 0?true: false}>{category}</SelectorButton>
                )})}
            </div>
            <SearchBar />
        </div>
    )
}