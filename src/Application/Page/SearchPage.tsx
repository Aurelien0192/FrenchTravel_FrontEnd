import { Loader } from "@mantine/core"
import { useSearchFilter } from "../../Module/SearchFilter/SearchFilter.hook"
import { SearchBar } from "../Components/General/SearchBar"
import { SearchFilterServices, searchFilterServices } from "../../Module/SearchFilter/SearchFilter.service"
import { Categories } from "../ComplexeComponents/Places/Categories.variable"
import { SelectorButton } from "../Components/General/SelectorButton"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { ResultSearchCard } from "../ComplexeComponents/Search/ResultSearchCard"

export const SearchPage:React.FC = () => {
    
    const { searchFilter,placesSearch,selectedIndex, categorieChoice, changeSelected } = useSearchFilter()

    const [pathNewSearch, setPathNewSearch] = useSearchParams()
    useEffect(()=>{    
        if(pathNewSearch.get('category') && Number(pathNewSearch.get('category')) !== selectedIndex){
            changeSelected(Number(pathNewSearch.get('category')))
        }
    },[])

    if(placesSearch){
        return(
            <div className="flex flex-row-reverse gap-4">
                <div className="flex flex-col gap-5 w-5/6">
                    <SearchBar value={pathNewSearch.get('search') && pathNewSearch.get('search')} 
                    onSubmit={(e) => {
                        e.preventDefault()
                        SearchFilterServices.searchPlaces(e, categorieChoice)
                        setPathNewSearch({
                            search: JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))).search,
                            category: selectedIndex.toString()
                        })
                        }}/>
                    <div className="flex flex-col gap-4">
                        {placesSearch.map((e,index) => {
                            return(
                                <ResultSearchCard key={index} place={e} />
                            )
                        })}
                    </div>
                </div>
                <aside className="w-1/6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">Filtre</h2>
                        <div className="flex flex-col">
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