/* composant textArea prenant comme propriété :
    - placeholder(obligatoire) : texte à afficher avant affichage
    - name(obligatoire) : nom de l'input
    - label(obligatoire) : fourni le label à afficher
    - size(obligatoire) : 3 valeurs possibles :
        -xs : hauteur 180px
        -md : hauteur 260px
        - xl: hauteur 384px (valeur par défaut) */

import { useEffect, useState } from "react"

type textAreaProps = {
    label: string
    placeholder: string
    name : string
    flexDirection?: "flex-col"
    value?: string
    size:"xs"|"md"|"xl"
    forcefull?:boolean //only if flexDirection
}

export const TextArea:React.FC<textAreaProps> = (props) => {
    const [valueTextArea, setValueTextArea] = useState<string>()

    useEffect(()=>{
        setValueTextArea(props.value)
    },[])

    return(
        <label className={`flex ${props.flexDirection === "flex-col"? "flex-col gap-[5px] items-start":"justify-between items-center"} w-full`}>
            {props.label}
            <textarea
                name={props.name}
                value={valueTextArea}
                onChange={(e)=>{setValueTextArea(e.currentTarget.value)}}
                className={`${props.flexDirection==="flex-col"?"w-full":`${props.forcefull? "w-full":"w-9/12"}`} flex ${props.size === "xs"? "h-[180px]": props.size==="md"? "h-[260px]":"h-96"} rounded-md shadow px-2`}
                placeholder={props.placeholder}></textarea>
        </label>
    )
}