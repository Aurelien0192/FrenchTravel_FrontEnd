/* Composant étoile prenant comme propriété 3 éléments :
    - selected: boolean permettant de savoir si l'utilisateur à choisi une catégorie d'hotel
    - hisCategorie: nombre correspondant de la catégorie hotel affectée à l'étoile
    - changeSelected : function permettant de passer selected à true ==> implique qu'une catégorie a été sélectionnée
Lorsque aucune catégorie n'est sélectionnée, le survol d'une étoile va définir la catégorie comme étant la valeur de l'étoile //1
à la sortie de la souris de l'élément, si aucune catégorie n'a été sélectionnée, la catégorie va repassé à 1, valeur minimale pour une catégorie d'hotel //2
Enfin, si l'utilisateur clique sur l'étoile, selected passe à true, et la catégorie d'hotel prend la valeur de l'hôtel //3
Lorsque selected est à true, le survol des étoiles n'a plus d'effet.

Enfin si une étoile ayant une valeur supérieure ou égale à une autre étoile, cette étoile est rempli d'orange, sinon elle reste blanche(tant que selected et false) //4
     */

import { useSelector } from "../../../Module/HotelCategorieOrNotationSelector/HotelCategorieSelectorOrNotation.hook"
import { hotelCategorieOrNotationService } from "../../../Module/HotelCategorieOrNotationSelector/HotelCategorieSelectorOrNotation.services"

type starHotelAndNoteProps = {
    selected: boolean
    hisCategorie:number
    forcedCategory? : number
    changeSelected? : Function
    type:"star"|"circle"
}

export const StarHotelAndNote:React.FC<starHotelAndNoteProps> =(props) => {
    const {selectedNoteOrHotelCategorie} = useSelector()
    return(
        <svg className={`${!props.forcedCategory && 'hover:cursor-pointer'} ${!props.forcedCategory? selectedNoteOrHotelCategorie >= props.hisCategorie? 'fill-orange':'fill-white' : props.forcedCategory >= props.hisCategorie? 'fill-orange':'fill-white'}`} //4
        onMouseEnter={() => {!props.selected && hotelCategorieOrNotationService.changehotelCategorieOrNotation(props.hisCategorie)}} //1
        onMouseLeave={() => {!props.selected && hotelCategorieOrNotationService.changehotelCategorieOrNotation(1)}} //2
        onClick={()=> {props.changeSelected && props.changeSelected(); props.changeSelected && hotelCategorieOrNotationService.changehotelCategorieOrNotation(props.hisCategorie)}} //3

        width={props.changeSelected ? "40" : "20"} height={props.changeSelected ? "40" : "20"} viewBox={props.type==="circle"?"0 0 40 40" : "0 0 20 20"} fill="none" xmlns="http://www.w3.org/2000/svg">
            {
                props.type === "star"?
                <g>
                    <g filter="url(#filter0_i_385_2577)">
                        <path d="M9.04894 2.92705C9.3483 2.00574 10.6517 2.00574 10.9511 2.92705L12.0206 6.21885C12.1545 6.63087 12.5385 6.90983 12.9717 6.90983H16.4329C17.4016 6.90983 17.8044 8.14945 17.0207 8.71885L14.2205 10.7533C13.87 11.0079 13.7234 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.388 16.2812L10.5878 14.2467C10.2373 13.9921 9.7627 13.9921 9.41221 14.2467L6.61204 16.2812C5.82833 16.8506 4.77385 16.0844 5.0732 15.1631L6.14277 11.8713C6.27665 11.4593 6.12999 11.0079 5.7795 10.7533L2.97933 8.71885C2.19562 8.14945 2.59839 6.90983 3.56712 6.90983H7.02832C7.46154 6.90983 7.8455 6.63087 7.97937 6.21885L9.04894 2.92705Z" fill="white"/>
                    </g>
                    <path d="M9.52447 3.08156C9.67415 2.6209 10.3259 2.6209 10.4755 3.08156L11.5451 6.37336C11.7459 6.99139 12.3218 7.40983 12.9717 7.40983H16.4329C16.9172 7.40983 17.1186 8.02964 16.7268 8.31434L13.9266 10.3488C13.4009 10.7307 13.1809 11.4078 13.3817 12.0258L14.4513 15.3176C14.6009 15.7783 14.0737 16.1613 13.6818 15.8766L10.8817 13.8422C10.3559 13.4602 9.64405 13.4602 9.11832 13.8422L6.31815 15.8766C5.9263 16.1613 5.39906 15.7783 5.54873 15.3176L6.6183 12.0258C6.81911 11.4078 6.59913 10.7307 6.07339 10.3488L3.27323 8.31434C2.88137 8.02964 3.08276 7.40983 3.56712 7.40983H7.02832C7.67816 7.40983 8.25409 6.99139 8.4549 6.37336L9.52447 3.08156Z" stroke="#D98D30"/>
                    <defs>
                        <filter id="filter0_i_385_2577" x="2.56519" y="2.23607" width="14.8696" height="16.2406" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="2"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_385_2577"/>
                        </filter>
                    </defs> 
                </g>

                : <circle cx="15" cy="15" r="14.5" stroke="#D98D30"/>
            }
        </svg>
    )
}