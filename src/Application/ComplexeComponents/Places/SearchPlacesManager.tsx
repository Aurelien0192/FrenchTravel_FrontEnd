import { SearchBar } from "../../Components/General/SearchBar"
import { SelectorButton } from "../../Components/General/SelectorButton"
import { SearchFilterServices } from "../../../Module/SearchFilter/SearchFilter.service"
import { useNavigate } from "react-router-dom"
import { Categories } from "./Categories.variable"
import { useSearchFilter } from "../../../Module/SearchFilter/SearchFilter.hook"


export const SearchPlacesManagement: React.FC = () => {


    const { selectedIndex, categorieChoice, changeSelected } = useSearchFilter()

    const navigate = useNavigate()

    
   
    return(
        <div className=" w-9/12 flex flex-col gap-[6px]">
            <div>
                {Categories.map((category, index) => {return(
                    <SelectorButton value={category} key={index} onClick={() => {changeSelected(index)}} selected={index === selectedIndex ? true: false}>{category}</SelectorButton>
                )})}
            </div>
            <SearchBar onSubmit={(e) => {SearchFilterServices.searchPlaces(e,categorieChoice);navigate(`/index/search/${SearchFilterServices.pathConstructorForSearch(e,selectedIndex, categorieChoice)}`)}} />
        </div>
    )
}