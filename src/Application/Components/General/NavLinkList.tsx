
import { NavLink } from "react-router-dom"

type navLinkList = {
    to: string
    children:React.ReactNode
    icon : React.ReactNode
}

export const NavLinkList:React.FC<navLinkList> = (props) =>{
    return(
        <li className="flex gap-[10px] items-center cursor-pointer hover:bg-sand">
            <NavLink className="flex gap-[10px] w-full items-center cursor-pointer hover:bg-sand" to={props.to}>
                {props.icon}
                <p className="text-2xl text-nowrap font-bold">{props.children}</p>
            </NavLink>
        </li>
    )
}