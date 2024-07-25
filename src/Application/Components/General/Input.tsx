/* Composant input recevant comme propriété:
    - placeholder(obligatoire) : texte à afficher avant affichage
    - name(obligatoire) : nom de l'input
    - label(obligatoire) : fourni le label à afficher
    - type(facultatif) : si password, l'input devient de type password
    - flexDirection(facultatif) : si flex-col, le label se trouve au dessus de l'input, par défaut l'input se trouve à droite du label*/

type inputProps = {
    placeholder: string
    name: string 
    label: string
    type?: "password"|undefined
    flexDirection? : "flex-col"|undefined
    icon?:string
    forcefull?:boolean //only if flexDirection
}

export const Input:React.FC<inputProps> = (props) => {
    return(
        <label className={`flex ${props.flexDirection === "flex-col"? "flex-col gap-[5px] items-start":"justify-between items-center"} w-full`}>
            {props.label}
            <div className={`${props.flexDirection==="flex-col"?"w-full":`${props.forcefull? "w-full":"w-9/12"}`} flex h-[26px] rounded-md shadow px-2`}>
                <img src={props.icon} />
                <input className="w-full" type={props.type? props.type:"text"}
                    name={props.name} 
                    placeholder={props.placeholder}></input>
            </div>
          </label>
    )
}