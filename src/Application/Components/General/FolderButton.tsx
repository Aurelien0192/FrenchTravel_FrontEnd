import { useState } from "react"
import { IoEllipsisVertical, IoTrash } from "react-icons/io5"
import { ButtonList } from "./ButtonList"
import { Folder } from "../../../Module/Folder/Folder.class"
import { useClickOutside } from "@mantine/hooks"

type folderButtonProps={
    children:React.ReactNode
    onClick: React.MouseEventHandler<HTMLButtonElement>
    onClickButtonDelete?: React.MouseEventHandler<HTMLButtonElement>
    selected:boolean
    menu?:boolean
    folder?:Folder
}

export const FolderButton:React.FC<folderButtonProps> = (props) =>{

    const [hidden, setHidden] = useState<boolean>(true)
    const ref = useClickOutside(() => setHidden(true))

    return(
        <div className={`flex relative justify-between items-center ${props.selected? "bg-orange":"hover:bg-sand"}`}>
            <button onClick={props.onClick} className={`w-full text-start`}>{props.children}</button>
            {props.menu && <button onClick={() => {setHidden(!hidden)}}>
                {<IoEllipsisVertical />}
            </button>}
            <ul ref={ref} className={`absolute right-0 top-6 z-50 p-2 bg-white rounded-lg shadow ${hidden && "hidden"}`}>
                <ButtonList text="small" icon={<IoTrash fill="#D98D30" size={"25px"} />} onClick={props.onClickButtonDelete? props.onClickButtonDelete:()=>{}}>supprimer</ButtonList>
            </ul>
        </div>
    )
}