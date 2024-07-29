import { Loader } from "@mantine/core"
import { PlaceDisplayLittleCard } from "../ComplexeComponents/Places/PlaceDisplayLittleCards"
import { useSearchFilter } from "../../Module/SearchFilter/SearchFilter.hook"
import { SearchBar } from "../Components/General/SearchBar"
import { searchFilter } from "../../Module/SearchFilter/SearchFilter.type"
import { SearchFilterServices, searchFilterServices } from "../../Module/SearchFilter/SearchFilter.service"
import { Categories } from "../ComplexeComponents/Places/Categories.variable"
import { SelectorButton } from "../Components/General/SelectorButton"

export const SearchPage:React.FC = () => {
    
    const { searchFilter,placesSearch,selectedIndex, categorieChoice, changeSelected } = useSearchFilter()

    function changeData(e:React.FormEvent<HTMLFormElement>){
        const search:searchFilter = JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries())))
        searchFilterServices.changeSearchInput(searchFilter!,search.search) 
    }

    if(placesSearch){
        return(
            <div className="flex flex-row-reverse">
                <div>
                    <SearchBar onSubmit={(e) => {e.preventDefault();SearchFilterServices.searchPlaces(e, categorieChoice)}}/>
                    {placesSearch.map((e) => {
                        return(
                            <PlaceDisplayLittleCard place={e} />
                        )
                    })}
                </div>
                <aside className="bg-sand">
                    <h2>Filtre</h2>
                    <div>
                        {Categories.map((category, index) => {return(
                            <SelectorButton key={index} onClick={(e) => {changeSelected(index);console.log(e.currentTarget);searchFilterServices.changeCategorie(searchFilter!,categorieChoice)}} selected={index === selectedIndex ? true: false}>{category}</SelectorButton>
                        )})}
                    </div>
                </aside>
            </div>
        )
    }else{
        return(
            <Loader />
        )
    }

}