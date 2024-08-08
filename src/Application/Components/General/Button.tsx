/* Composant bouton prenant comme propriétés : 
    - size : obligatoire : deux tailles possibles, soit xs soit md, si xs, bouton d'une hauteur de 28px, si md, bouton avec padding sur axe y de 16px
    - onClick : facultatif : function permettant de définir une action lors du click sur le bouton
    - children : obligatoire : element à placer entre les deux balises boutons
    - type : facultatif : permet de définir le type du bouton entre button, submit et reset. par défaut est un button 
    - disabled : facultatif : si true, le bouton est désactivé, rendant le bouton opaque à 75%. par défaut à false
    - variant : permet de définir si bouton clair ou foncé. Si light, inversion des couleurs par rapport à celle par défaut */

import { MouseEventHandler } from "react"

type buttonProps={
    size?: "xs"|"md"
    onClick?: MouseEventHandler<HTMLButtonElement>
    children:React.ReactNode
    type?: "submit" | "reset" | "button" | undefined
    disabled?: boolean
    variant?:"light"|"transparent"|undefined
}

export const Button:React.FC<buttonProps> = (props) => {
    let action:MouseEventHandler<HTMLButtonElement>|undefined=undefined
    
    if(props.onClick && !props.disabled){
        action = props.onClick
    }
    return(
        <button 
            className={`${props.variant === "light"?
                    "bg-sand text-brown rounded-lg w-fit px-4": props.variant==="transparent"?
                        "m-auto uppercase font-bold rounded-xl px-1 py-3 border-2 border-yellow-600 text-yellow-600" :
                        "bg-brown text-sand rounded-lg w-fit px-4"} 
                 whitespace-nowrap
                ${props.size === "xs" ? "h-7": props.variant==="transparent"?"" : "h-fit py-4"}
                ${props.disabled && "opacity-75 cursor-not-allowed"}`
            } 
            onClick={action}
            type={props.type? props.type: "button"}
        >{props.children}</button>
    )
}

// <button className=" m-auto uppercase font-bold rounded-xl px-1 py-3 border-2 border-yellow-600 text-yellow-600"
//                     onClick={(e) => {e.preventDefault();imageManagementService.deleteImage(filesTab as Array<File>, filesUrl,props.index)}} //3
//                   >supprimer</button>