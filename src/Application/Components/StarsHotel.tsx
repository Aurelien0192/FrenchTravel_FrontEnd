import { useCategorieSelector } from "../../Module/HotelCategorieSelector/HotelCategorieSelector.hook"
import { hotelCategorieService } from "../../Module/HotelCategorieSelector/HotelCategorieSelector.services"

type starHotelProps = {
    selected: boolean
    hisCategorie:number
    changeSelected : Function
}

export const StarHotel:React.FC<starHotelProps> =(props) => {

    const {hotelCategorie} = useCategorieSelector()
    
    return(
        <svg className={`hover:cursor-pointer ${hotelCategorie>= props.hisCategorie? 'fill-orange':'fill-white'}`}
        onMouseEnter={() => {!props.selected && hotelCategorieService.changehotelCategorie(props.hisCategorie)}}
        onMouseLeave={() => {!props.selected && hotelCategorieService.changehotelCategorie(1)}}
        onClick={()=> {props.changeSelected();hotelCategorieService.changehotelCategorie(props.hisCategorie)}}
        width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </svg>
    )
}