/* Composant NavLink prenant comme propriétés : 
    - size : obligatoire : deux tailles possibles, soit xs soit md, si xs, bouton d'une hauteur de 28px, si md, bouton avec padding sur axe y de 16px
    - to : obligatoire : fourni la path de la page à acceder lors du clique sur le navLink
    - children : obligatoire : element à placer entre les deux balises boutons
    - disabled : facultatif : si true, le bouton est désactivé, rendant le bouton hidden. par défaut à false
    - variant : permet de définir si bouton clair ou foncé. Si light, inversion des couleurs par rapport à celle par défaut */

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