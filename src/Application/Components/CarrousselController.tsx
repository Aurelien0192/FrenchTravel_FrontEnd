import { MouseEventHandler } from "react"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

type carrousselControllerProps = {
    direction: "right"|"left"
    disabled : boolean
    onClick : MouseEventHandler<HTMLButtonElement>
}

export const CarrousselController:React.FC<carrousselControllerProps> = (props) => {
    return(
        <button className={`bg-sand rounded-full border-2 border-orange absolute top-[190px] ${props.direction === "right" && "right-0"} ${props.disabled && "opacity-50"}`} onClick={props.onClick}>
            {props.direction==="left"? <IoChevronBackOutline size={"35px"} color="#D98D30"/>: <IoChevronForwardOutline size={"35px"} color="#D98D30"/>}
        </button>
    )
}