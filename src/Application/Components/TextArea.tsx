type textAreaProps = {
    label: string
    placeholder: string
    name : string
    size:"xs"|"md"|"xl"
}

export const TextArea:React.FC<textAreaProps> = (props) => {
    return(
        <label className="flex justify-between items-top">
            {props.label}
            <textarea
            name={props.name}
            className={` px-1 w-9/12 ${props.size === "xs"? "h-[180px]": props.size==="md"? "h-[260px]":"h-96"} rounded-md shadow align-bottom`} 
            placeholder={props.placeholder}></textarea>
        </label>
    )
}