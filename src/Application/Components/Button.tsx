/* Composant bouton prenant comme propriétés : 
    - size : obligatoire : deux tailles possibles, soit xs soit md, si xs, bouton d'une hauteur de 28px, si md, bouton avec padding sur axe y de 16px
    - onClick : facultatif : function permettant de définir une action lors du click sur le bouton
    - children : obligatoire : element à placer entre les deux balises boutons
    - type : facultatif : permet de définir le type du bouton entre button, submit et reset. par défaut est un button 
    - disabled : facultatif : si true, le bouton est désactivé, rendant le bouton opaque à 75%. par défaut à false
    - variant : permet de définir si bouton clair ou foncé. Si light, inversion des couleurs par rapport à celle par défaut */

import { MouseEventHandler } from "react"

type buttonProps={
    size: "xs"|"md"
    onClick?: MouseEventHandler<HTMLButtonElement>
    children:React.ReactNode
    type?: "submit" | "reset" | "button" | undefined
    disabled?: boolean
    variant?:"light"|undefined
}

export const Button:React.FC<buttonProps> = (props) => {
    let action:MouseEventHandler<HTMLButtonElement>|undefined=undefined
    
    if(props.onClick && !props.disabled){
        action = props.onClick
    }
    return(
        <button 
            className={`${props.variant === "light"?" bg-sand text-brown": "bg-brown text-sand"} 
                rounded-lg w-fit px-4 ${props.size === "xs" ? "h-7": "h-fit py-4"} ${props.disabled && "opacity-75"}`} 
            onClick={action}
            type={props.type? props.type: "button"}
        >{props.children}</button>
    )
}