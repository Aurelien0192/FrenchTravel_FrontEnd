type doublesInputProps = {
    placeholder: Array<string>
    name: Array<string> 
    label: string
}

export const DoubleInput:React.FC<doublesInputProps> = (props) => {
    return(
        <label className="flex justify-between items-center">
            {props.label}
            <div className="flex gap-5 w-9/12 px-1">
              <input type="text" name={props.name[0]}
              className="w-full h-[26px] rounded-md shadow px-1" 
              placeholder={props.placeholder[0]}></input>
              <input type="text" name={props.name[1]}
              className="w-full h-[26px] rounded-md shadow px-1" 
              placeholder={props.placeholder[1]}></input>
            </div>
          </label>
    )
}