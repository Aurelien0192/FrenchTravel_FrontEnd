import logoSearch from "../../../../public/Logo/Search.svg"
import { Button } from "./Button"
import { Input } from "./Input"

type SearchBarProps = {
    categorie?:string
}

export const SearchBar: React.FC<SearchBarProps> = () => {
    return(
        <form className="flex w-full">
            <Input 
                placeholder="Un lieu ou dormir, manger, visiter, s'amuser, rêver?" 
                name="search" 
                forcefull={true} 
                label="" 
                icon={logoSearch} 
            />
            <Button type="submit" size="xs">Rechercher</Button>
        </form>
    )
}