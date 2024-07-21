/* composant select ayant comme propriété:
    - label(obligatoire) : fourni le label à afficher
    - name(obligatoire) : nom de l'input
    - options(obligatoire) : fourni le nom et la valeur des options à fournir au select. si value undefined, le nom de l'option devient sa value
    - onChange(facultatif) : function permettant de définir des actions lorque select change */

type option = {
    name:string
    value?:string|number
}

type selectInputProps = {
    label: string
    name: string
    options: Array<option>
    onChange?: Function
}

export const SelectInput:React.FC<selectInputProps> = (props) => {
    
    return(
        <label className="flex justify-between items-center px-1">
            {props.label}
            <select name={props.name} onChange={props.onChange && ((e) =>{props.onChange!(e.currentTarget.value)})} className="w-9/12 h-[26px] rounded-md shadow">
                {props.options.map((option,index) => {return(
                    <option key={index} value={option.value? option.value : option.name}>{option.name}</option>
                )})}
            </select>
        </label>
    )
}