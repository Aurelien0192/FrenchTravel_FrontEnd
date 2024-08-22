import { MouseEventHandler } from "react"


type buttonList = {
    onClick: MouseEventHandler<HTMLButtonElement>
    children:React.ReactNode
    icon : React.ReactNode
    text?: "small"
}

export const ButtonList:React.FC<buttonList> = (props) =>{
    return(
        <li className="flex gap-[10px] items-center cursor-pointer hover:bg-sand">
            <button className="flex gap-[10px] w-full items-center cursor-pointer hover:bg-sand" onClick={props.onClick}>
                {props.icon}
                <p className={`${props.text !== "small" && "text-2xl"} text-nowrap font-bold`}>{props.children}</p>
            </button>
        </li>
    )
}