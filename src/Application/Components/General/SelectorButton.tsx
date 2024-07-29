import { MouseEventHandler } from "react"

type SelectorButtonProps = {
    selected:boolean
    children:React.ReactNode
    value:string
    onClick : MouseEventHandler<HTMLButtonElement>
}

export const SelectorButton: React.FC<SelectorButtonProps> = (props) => {
    return (
        <button
            value={props.value}
            className={` px-4 py-2 text-2xl font-bold ${props.selected ?"bg-orange":"hover:bg-sand"}`}
            onClick={props.onClick}
        >{props.children}</button>
    )
}