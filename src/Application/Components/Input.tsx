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
}

export const Input:React.FC<inputProps> = (props) => {
    return(
        <label className={`flex ${props.flexDirection === "flex-col"? "flex-col gap-[5px] items-start":"justify-between items-center"} `}>
            {props.label}
            <input type={props.type? props.type:"text"}
            name={props.name}
            className={`${props.flexDirection==="flex-col"?"w-full":"w-9/12"} h-[26px] rounded-md shadow px-2`} 
            placeholder={props.placeholder}></input>
          </label>
    )
}