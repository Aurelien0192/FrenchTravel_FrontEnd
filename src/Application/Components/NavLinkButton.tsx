import { MouseEventHandler } from "react"
import { NavLink } from "react-router-dom"

type navLinkButtonProps={
    size: "xs"|"md"
    children:React.ReactNode
    disabled?: boolean
    to:string
}

export const NavLinkButton:React.FC<navLinkButtonProps> = (props) => {
    let action:MouseEventHandler<HTMLButtonElement>|undefined=undefined

    return(
        <NavLink 
            className={`bg-brown text-sand rounded-lg w-fit px-4 ${props.size === "xs" ? "h-7": "py-4"} 
                ${props.disabled && " hidden"}`} 
            onClick={action}
            to={props.to}
        >{props.children}</NavLink>
    )
}