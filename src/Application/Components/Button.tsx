import { MouseEventHandler } from "react"

type buttonProps={
    size: "xs"|"md"
    onClick?: MouseEventHandler<HTMLButtonElement>
    children:React.ReactNode
    type?: "submit" | "reset" | "button" | undefined
    disabled?: boolean
}

export const Button:React.FC<buttonProps> = (props) => {
    let action:MouseEventHandler<HTMLButtonElement>|undefined=undefined
    
    if(props.onClick && !props.disabled){
        action = props.onClick
    }
    return(
        <button 
            className={`bg-brown text-sand rounded-lg w-fit px-4 ${props.size === "xs" ? "h-7": "py-4"} ${props.disabled && "opacity-75"}`} 
            onClick={action}
            type={props.type}
        >{props.children}</button>
    )
}