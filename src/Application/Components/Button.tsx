import { MouseEventHandler } from "react"

type buttonProps={
    size: "xs"|"md"
    onClick?: MouseEventHandler<HTMLButtonElement>
    children:React.ReactNode
    type?: "submit" | "reset" | "button" | undefined
}

export const Button:React.FC<buttonProps> = (props) => {
    return(
        <button 
            className={`bg-brown text-sand rounded-lg w-fit px-4 ${props.size === "xs" ? "h-7": "py-4"}`} 
            onClick={props.onClick}
            type={props.type}
        >{props.children}</button>
    )
}