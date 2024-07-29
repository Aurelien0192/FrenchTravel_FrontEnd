import { MouseEventHandler, useEffect, useState } from "react"
import logoSearch from "../../../../public/Logo/Search.svg"
import { Button } from "./Button"
import { Input } from "./Input"

type SearchBarProps = {
    onClick?: MouseEventHandler<HTMLElement>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    value?:string
}

export const SearchBar: React.FC<SearchBarProps> = (props) => {

    const [valueofInput, setValueOfInput] = useState<string>("")

    useEffect(() => {
        if(props.value && props.value !== valueofInput){
            setValueOfInput(props.value)
        }
    },[])

    return(
        <form onSubmit={props.onSubmit} className="flex w-full">
            <Input 
                placeholder="Un lieu ou dormir, manger, visiter, s'amuser, rêver?" 
                name="search" 
                forcefull={true} 
                label=""
                value={valueofInput}
                onChange={((e) => {e.preventDefault(),setValueOfInput(e.currentTarget.value)})}
                icon={logoSearch} 
            />
            <Button type="submit" onClick={props.onClick} size="xs">Rechercher</Button>
        </form>
    )
}