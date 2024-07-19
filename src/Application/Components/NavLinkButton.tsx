import { MouseEventHandler } from "react"
import { NavLink } from "react-router-dom"

type navLinkButtonProps={
    size: "xs"|"md"
    children:React.ReactNode
    disabled?: boolean
    to:string
    variant?:"light"|undefined
}

export const NavLinkButton:React.FC<navLinkButtonProps> = (props) => {
    let action:MouseEventHandler<HTMLButtonElement>|undefined=undefined

    return(
        <NavLink 
            className={`${props.variant === "light"?" bg-sand text-brown": "bg-brown text-sand"} ${props.size === "xs" ? "h-7": "py-4"} 
                ${props.disabled && " hidden"}`} 
            onClick={action}
            to={props.to}
        >{props.children}</NavLink>
    )
}