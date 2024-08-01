/* composant permettant l'insertion d'un double input sous le même label.
possède comme propriété:
  - placeholder : tableau de string, index 0 correspond à l'input 1 et index 1 à l'input 2
  - name : tableau de string fournissant le nom des inputs, index 0 correspond à l'input 1 et index 1 à l'input 2
  - label : fourni le label à afficher*/

import { useEffect, useState } from "react"

type doublesInputProps = {
    placeholder: Array<string>
    name: Array<string> 
    label: string
    value1?: string
    value2?: string
}

export const DoubleInput:React.FC<doublesInputProps> = (props) => {

  const [valueInput1, setValueInput1] = useState<string>()
  const [valueInput2, setValueInput2] = useState<string>()

  useEffect(()=>{
    setValueInput1(props.value1)
    setValueInput2(props.value2)
  },[])

    return(
        <label className="flex justify-between items-center">
            {props.label}
            <div className="flex gap-5 w-9/12 px-1">
              <input type="text" name={props.name[0]}
              className="w-full h-[26px] rounded-md shadow px-1"
              value={valueInput1}
              onChange={(e) => {setValueInput1(e.currentTarget.value)}} 
              placeholder={props.placeholder[0]}></input>
            <input type="text" name={props.name[1]}
              className="w-full h-[26px] rounded-md shadow px-1"
              value={valueInput2}
              onChange={(e) => {setValueInput2(e.currentTarget.value)}} 
              placeholder={props.placeholder[1]}></input>
            </div>
          </label>
    )
}