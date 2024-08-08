import { Loader, Pagination } from "@mantine/core"
import { useSearchFilter } from "../../Module/SearchFilter/SearchFilter.hook"
import { SearchBar } from "../Components/General/SearchBar"
import { Categories } from "../../Module/Place/Categories.variable"
import { SelectorButton } from "../Components/General/SelectorButton"
import { ResultSearchCard } from "../ComplexeComponents/Search/ResultSearchCard"
import { HotelCategorieOrNotationSelector } from "../ComplexeComponents/Places/HotelCategorieOrNotationSelector"
import { Button } from "../Components/General/Button"
import { useState } from "react"
import { IoCloseSharp } from "react-icons/io5"

export const SearchPage:React.FC = () => {
    
    const { placesSearch,pathNewSearch,selectedIndex, totalOfPlace, page, changePage, changeSearchInput, changeCategorieIndex } = useSearchFilter()
    const [filterHidden, setFilterHidden] = useState<boolean>(true)

    if(placesSearch){
        return(
            <div className="flex flex-row-reverse w-full gap-4 relative">
                <div className="flex flex-col gap-5 w-full md:w-5/6">
                    <SearchBar value={pathNewSearch.get('search') && pathNewSearch.get('search')} 
                    onSubmit={(e) => {
                        e.preventDefault()
                        changeSearchInput(JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))).search)}}/>
                    <div className="md:hidden">
                        <Button onClick={()=>{setFilterHidden(false)}} size="xs">filtre</Button>
                    </div>
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
                <aside className={`${filterHidden && "hidden"} fixed bg-white top-0 left-0 bottom-0 w-full md:w-1/6 md:relative md:block`}>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold">Filtres</h2>
                            <button className=" md:hidden" onClick={()=>{setFilterHidden(true)}}>
                                <IoCloseSharp size="40px" />
                            </button>
                        </div>
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
                            <HotelCategorieOrNotationSelector categorie={1} selected={true} labelHidden={true} /> 
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