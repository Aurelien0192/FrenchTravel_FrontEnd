import { MouseEventHandler } from "react"
import logoSearch from "../../../../public/Logo/Search.svg"
import { Button } from "./Button"
import { Input } from "./Input"

type SearchBarProps = {
    onClick?: MouseEventHandler<HTMLElement>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
}

export const SearchBar: React.FC<SearchBarProps> = (props) => {
    return(
        <form onSubmit={props.onSubmit} className="flex w-full">
            <Input 
                placeholder="Un lieu ou dormir, manger, visiter, s'amuser, rêver?" 
                name="search" 
                forcefull={true} 
                label="" 
                icon={logoSearch} 
            />
            <Button type="submit" onClick={props.onClick} size="xs">Rechercher</Button>
        </form>
    )
}