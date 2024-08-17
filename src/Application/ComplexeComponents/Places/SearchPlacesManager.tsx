import { SearchBar } from "../../Components/General/SearchBar"
import { SelectorButton } from "../../Components/General/SelectorButton"
import { SearchFilterServices } from "../../../Module/SearchFilter/SearchFilter.service"
import { useNavigate, createSearchParams } from "react-router-dom"
import { Categories } from "../../../Module/Place/Categories.variable"
import { useSearchFilter } from "../../../Module/SearchFilter/SearchFilter.hook"


export const SearchPlacesManagement: React.FC = () => {


    const { selectedIndex, categorieChoice, changeCategorieIndex } = useSearchFilter()

    const navigate = useNavigate()

    
   
    return(
        <div className=" w-full md:w-9/12 flex flex-col gap-[6px]">
            <div className="flex">
                {Categories.map((category, index) => {return(
                    <SelectorButton value={category} key={index} onClick={() => {changeCategorieIndex(index)}} selected={index === selectedIndex ? true: false}>{category}</SelectorButton>
                )})}
            </div>
            <SearchBar onSubmit={(e) => {SearchFilterServices.searchPlaces(e,categorieChoice);
                navigate({
                    pathname:`/index/search/`,
                    search:`?${createSearchParams({
                        search:`${JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))).search}`,
                        categorie:`${SearchFilterServices.catergoriesMap(selectedIndex)}`,
                        index: JSON.stringify(selectedIndex)
                    })}`    
                })}} />
        </div>
    )
}