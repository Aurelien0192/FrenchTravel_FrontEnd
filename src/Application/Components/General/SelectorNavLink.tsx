import { NavLink } from "react-router-dom"

type SelectorNavLinkProps = {
    selected:boolean
    children:React.ReactNode
    to:string
}

export const SelectorNavLink: React.FC<SelectorNavLinkProps> = (props) => {
    return (
        <NavLink
        to={props.to}
            className={` px-4 py-2 text-nowrap text-2xl font-bold ${props.selected ?"bg-orange":"hover:bg-sand"}`}
        >{props.children}</NavLink>
    )
}