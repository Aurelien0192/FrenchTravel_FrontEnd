type folderButtonProps={
    children:React.ReactNode
    onClick: React.MouseEventHandler<HTMLButtonElement>
    selected:boolean
}

export const FolderButton:React.FC<folderButtonProps> = (props) =>{
    return(
        <button onClick={props.onClick} className={`w-full text-start ${props.selected? "bg-orange":"hover:bg-sand"} `}>{props.children}</button>
    )
}