/* composant textArea prenant comme propriété :
    - placeholder(obligatoire) : texte à afficher avant affichage
    - name(obligatoire) : nom de l'input
    - label(obligatoire) : fourni le label à afficher
    - size(obligatoire) : 3 valeurs possibles :
        -xs : hauteur 180px
        -md : hauteur 260px
        - xl: hauteur 384px (valeur par défaut) */

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