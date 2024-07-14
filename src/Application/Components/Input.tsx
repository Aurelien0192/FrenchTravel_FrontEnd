type inputProps = {
    placeholder: string
    name: string 
    label: string
}

export const Input:React.FC<inputProps> = (props) => {
    return(
        <label className="flex justify-between items-center">
            {props.label}
            <input type="text"
            name={props.name}
            className="w-9/12 h-[26px] rounded-md shadow px-2" 
            placeholder={props.placeholder}></input>
          </label>
    )
}