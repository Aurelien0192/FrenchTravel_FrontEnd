import { useEffect, useState } from "react"
import { SearchBar } from "../Components/General/SearchBar"
import { SelectorNavLink } from "../Components/General/SelectorNavLink"
import { Place } from "../../Module/Place/Place.class"
import { placeService } from "../../Module/Place/Place.services"
import { Loader, Pagination } from "@mantine/core"
import { ResultSearchCard } from "../ComplexeComponents/Search/ResultSearchCard"

export const OwnerPlacesBrowser:React.FC = () => {

    const [placesTab, setPlacesTab] = useState<Array<Place>>()
    const [totalOfPlace, setTotalOfPlace] = useState<number>()
    const [page, setPage] = useState<number>(1)

    useEffect(()=>{
        async function getDataFromSearch(){
            const places = await placeService.getManyPlaceSearch(`/places/?user_id=${JSON.parse(sessionStorage.getItem("UserAuthentifiate")as string).data._id }&page=${page}&limit=4`)
            setPlacesTab(places.places as Array<Place>)
            setTotalOfPlace(places.total)
            
        }
        getDataFromSearch()
    },[page])

    function changePage(page:number){
        setPage(page)
    }

    return(
        <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-3">
                <div className="flex">
                    <SelectorNavLink to="/index/user/places" selected={true}>Mes établissements</SelectorNavLink>
                    <SelectorNavLink to="" selected={false}>Mes commentaires</SelectorNavLink>
                </div>
                <SearchBar/>
            </div>
            <div className="flex flex-col gap-5 w-full">
                {placesTab ? placesTab.map((place,index) => {
                    return <ResultSearchCard key={index} place={place}/>
                }):<Loader />}
            </div>
            <Pagination 
                        total={totalOfPlace ? Math.ceil(totalOfPlace/4) : 1}
                        color={"#8C3616"}
                        value={page}
                        onChange={(value:number) => changePage(value)}
                        onNextPage={() => changePage(page+1)}
                        onPreviousPage={() => changePage(page-1)} />
        </div>
    )
}