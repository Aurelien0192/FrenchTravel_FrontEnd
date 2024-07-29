import { Loader } from "@mantine/core"
import { PlaceDisplayLittleCard } from "../ComplexeComponents/Places/PlaceDisplayLittleCards"
import { useSearchFilter } from "../../Module/SearchFilter/SearchFilter.hook"
import { SearchBar } from "../Components/General/SearchBar"
import { SearchFilterServices, searchFilterServices } from "../../Module/SearchFilter/SearchFilter.service"
import { Categories } from "../ComplexeComponents/Places/Categories.variable"
import { SelectorButton } from "../Components/General/SelectorButton"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export const SearchPage:React.FC = () => {
    
    const { searchFilter,placesSearch,selectedIndex, categorieChoice, changeSelected } = useSearchFilter()

    const  {pathSearch} = useParams()
    
    const searchParameters = SearchFilterServices.pathSearchParser(pathSearch)
    
    useEffect(()=>{    
        if(searchParameters.category && Number(searchParameters.category) !== selectedIndex){
            changeSelected(Number(searchParameters.category))
        }
    },[])

    if(placesSearch){
        return(
            <div className="flex flex-row-reverse">
                <div>
                    <SearchBar value={searchParameters.search && searchParameters.search} onSubmit={(e) => {e.preventDefault();SearchFilterServices.searchPlaces(e, categorieChoice)}}/>
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
                            <SelectorButton 
                                value={category} 
                                key={index} 
                                onClick={(e) => {changeSelected(index);searchFilterServices.changeCategorie(searchFilter!,e.currentTarget.value)}} 
                                selected={index === selectedIndex ? true: false}
                            >
                                {category}
                            </SelectorButton>
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