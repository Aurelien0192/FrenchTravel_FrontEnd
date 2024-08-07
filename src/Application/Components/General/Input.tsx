/* Composant input recevant comme propriété:
    - placeholder(obligatoire) : texte à afficher avant affichage
    - name(obligatoire) : nom de l'input
    - label(obligatoire) : fourni le label à afficher
    - type(facultatif) : si password, l'input devient de type password
    - flexDirection(facultatif) : si flex-col, le label se trouve au dessus de l'input, par défaut l'input se trouve à droite du label*/
import { ChangeEventHandler, useEffect, useState } from "react"
type inputProps = {
    placeholder: string
    name: string 
    label: string
    value?:string
    type?: "password"|undefined
    flexDirection? : "flex-col"|undefined
    onChange?:ChangeEventHandler<HTMLInputElement>
    icon?:string
    forcefull?:boolean //only if flexDirection
}

export const Input:React.FC<inputProps> = (props) => {

    const [valueInput, setValueInput] = useState<string>()

    useEffect(()=>{
        setValueInput(props.value)
    },[])

    return(
        <label className={`flex ${props.flexDirection === "flex-col"? "flex-col gap-[5px] items-start":"justify-between items-center"} w-full`}>
            {props.label}
            <div className={`${props.flexDirection==="flex-col"?"w-full":`${props.forcefull? "w-full":"w-9/12"}`} flex h-[26px] rounded-md shadow px-2`}>
                <img src={props.icon} />
                <input className="w-full" value={valueInput} type={props.type? props.type:"text"}
                    name={props.name} 
                    placeholder={props.placeholder}
                    onChange={(e)=>{props.onChange && props.onChange;setValueInput(e.currentTarget.value)}}></input>
            </div>
          </label>
    )
}