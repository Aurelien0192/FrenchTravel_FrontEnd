import { Loader, Pagination } from "@mantine/core"
import { useSearchFilter } from "../../Module/SearchFilter/SearchFilter.hook"
import { SearchBar } from "../Components/General/SearchBar"
import { Categories } from "../ComplexeComponents/Places/Categories.variable"
import { SelectorButton } from "../Components/General/SelectorButton"
import { ResultSearchCard } from "../ComplexeComponents/Search/ResultSearchCard"
import { HotelCategorieSelector } from "../ComplexeComponents/Places/HotelCategorieSelector"

export const SearchPage:React.FC = () => {
    
    const { placesSearch,pathNewSearch,selectedIndex, totalOfPlace, page, changePage, changeSearchInput, changeCategorieIndex } = useSearchFilter()
    if(placesSearch){
        return(
            <div className="flex flex-row-reverse gap-4">
                <div className="flex flex-col gap-5 w-5/6">
                    <SearchBar value={pathNewSearch.get('search') && pathNewSearch.get('search')} 
                    onSubmit={(e) => {
                        e.preventDefault()
                        changeSearchInput(JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))).search)}}/>
                    <div className="flex flex-col gap-4">
                        {placesSearch.map((e,index) => {
                            return(
                                <ResultSearchCard key={index} place={e} />
                            )
                        })}
                    </div>
                    <Pagination 
                        total={Math.ceil(totalOfPlace/7)}
                        color={"#8C3616"}
                        value={page}
                        onChange={(value:number) => changePage(value)}
                        onNextPage={() => changePage(page+1)}
                        onPreviousPage={() => changePage(page-1)} />
                </div>
                <aside className="w-1/6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">Filtre</h2>
                        <div className="flex flex-col">
                            {Categories.map((category, index) => {return(
                                <SelectorButton 
                                value={category} 
                                key={index} 
                                onClick={() => {changeCategorieIndex(index);
                                }} 
                                selected={index === selectedIndex ? true: false}
                                >
                                    {category}
                                </SelectorButton>
                            )})}
                        </div>
                        {pathNewSearch.get('categorie')==="hotel" && 
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold">Categorie d'hotel :</h2>
                            <HotelCategorieSelector labelHidden={true} /> 
                        </div>}
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