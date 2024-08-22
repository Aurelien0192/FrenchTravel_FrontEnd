import { useState } from "react"
import { IoEllipsisVertical } from "react-icons/io5"

type folderButtonProps={
    children:React.ReactNode
    onClick: React.MouseEventHandler<HTMLButtonElement>
    selected:boolean
}

export const FolderButton:React.FC<folderButtonProps> = (props) =>{

    const [hidden, setHidden] = useState<boolean>(true)

    return(
        <div className={`flex relative justify-between items-center ${props.selected? "bg-orange":"hover:bg-sand"}`}>
            <button onClick={props.onClick} className={`w-full text-start`}>{props.children}</button>
            <button onClick={() => {setHidden(!hidden)}}>
                <IoEllipsisVertical />
            </button>
            <div className={`absolute right-0 top-6 z-50 bg-white rounded-lg shadow ${hidden && "hidden"}`}>
                <p>coucou</p>
            </div>
        </div>
    )
}