import { Loader } from "@mantine/core"
import { PlaceDisplayLittleCard } from "../ComplexeComponents/Places/PlaceDisplayLittleCards"
import { useSearchFilter } from "../../Module/SearchFilter/SearchFilter.hook"
import { SearchBar } from "../Components/General/SearchBar"
import { SearchFilterServices, searchFilterServices } from "../../Module/SearchFilter/SearchFilter.service"
import { Categories } from "../ComplexeComponents/Places/Categories.variable"
import { SelectorButton } from "../Components/General/SelectorButton"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

export const SearchPage:React.FC = () => {
    
    const { searchFilter,placesSearch,selectedIndex, categorieChoice, changeSelected } = useSearchFilter()

    const [pathNewSearch, setPathNewSearch] = useSearchParams()
    console.log(pathNewSearch)
    useEffect(()=>{    
        if(pathNewSearch.get('category') && Number(pathNewSearch.get('category')) !== selectedIndex){
            changeSelected(Number(pathNewSearch.get('category')))
        }
    },[])

    if(placesSearch){
        return(
            <div className="flex flex-row-reverse">
                <div>
                    <SearchBar value={pathNewSearch.get('search') && pathNewSearch.get('search')} 
                    onSubmit={(e) => {
                        e.preventDefault()
                        SearchFilterServices.searchPlaces(e, categorieChoice)
                        setPathNewSearch({
                            search: JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))).search,
                            category: selectedIndex.toString()
                        })
                        }}/>
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
                                onClick={(e) => {changeSelected(index);
                                    searchFilterServices.changeCategorie(searchFilter!,e.currentTarget.value);
                                    setPathNewSearch({
                                        search:`${pathNewSearch.get('search')}`,
                                        category:index.toString()})}} 
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