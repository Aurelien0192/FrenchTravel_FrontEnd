type folderButtonProps={
    children:React.ReactNode
}

export const FolderButton:React.FC<folderButtonProps> = (props) =>{
    return(
        <button className="w-full text-start hover:bg-sand">{props.children}</button>
    )
}