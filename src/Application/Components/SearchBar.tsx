import logoSearch from "../../../public/Logo/Search.svg"
import { Button } from "./Button"
import { Input } from "./Input"

export const SearchBar: React.FC = () => {
    return(
        <form className="flex w-full">
            <Input placeholder="Un lieu ou dormir, manger, visiter, s'amuser, rêver?" name="search" forcefull={true} label="" icon={logoSearch} />
            <Button size="xs">Rechercher</Button>
        </form>
    )
}