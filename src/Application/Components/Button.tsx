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