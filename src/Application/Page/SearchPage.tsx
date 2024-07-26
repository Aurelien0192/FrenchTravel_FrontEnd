import { Loader } from "@mantine/core"
import { PlaceDisplayLittleCard } from "../ComplexeComponents/Places/PlaceDisplayLittleCards"
import { useSearchFilter } from "../../Module/SearchFilter/SearchFilter.hook"

export const SearchPage:React.FC = () => {
    
    const {searchFilter, placesSearch} = useSearchFilter()
    

    if(placesSearch){
        return(
            <div>
                {placesSearch.map((e) => {
                    return(
                        <PlaceDisplayLittleCard place={e} />
                    )
                })}
            </div>
        )
    }else{
        return(
            <Loader />
        )
    }

}