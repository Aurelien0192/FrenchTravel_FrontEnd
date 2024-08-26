import { useFavorite } from "../../../Module/Favorite/Favorite.hook"

type favoriteHeartprops={
    place_id: string
}

export const FavoriteHeart:React.FC<favoriteHeartprops> = (props) => {
    
    const {isInFavorite, addOrDeleteFavorite} = useFavorite(props.place_id)

    return(
            <button onClick={addOrDeleteFavorite}>
                <svg width="32" height="33" viewBox="0 0 32 33" fill={isInFavorite? "#D98D30" :"none"} xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.4025 19.806C24.2177 24.5423 18.3245 29.1343 15.9684 31C13.8063 29.5671 8.89996 24.9552 4.5342 19.806C2.24735 16.2239 0.999967 15.4307 1 10.403C1.00004 5.02982 4.32627 1 9.73151 1C13.8894 1 15.3447 3.01492 15.9684 4.13436C16.592 3.01492 17.4236 1.00003 22.6209 1C26.5709 0.999975 31.3525 4.80597 30.9367 10.403C30.9367 10.403 31.7683 13.3134 27.4025 19.806Z" stroke={isInFavorite?"#000000":"#D98D30"} strokeWidth="2"/>
                </svg>
            </button>
    )
}