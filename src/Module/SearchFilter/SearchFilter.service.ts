import { searchFilter } from "./SearchFilter.type";
import { placeService } from "../Place/Place.services";

export class SearchFilterServices{

    static searchPlaces(e:React.FormEvent<HTMLFormElement>, categorieChoice?: string){
        e.preventDefault()
        const searchOption:searchFilter = JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries())))

        switch(categorieChoice){
            case "Hôtels" :
                searchOption.categorie = "hotel"
                break;
            case "Restaurants":
                searchOption.categorie = "restaurant"
                break;
            case "Activités":
                searchOption.categorie = "activity"
                break;
            default:
                searchOption.categorie=undefined
                break;
        }
        placeService.razPlacesInObservable()
    }

    static categoriesMap(index:number){
    let category = ""
    switch(index){
        case 1 :
            category = "hotel"
            break;
        case 2:
            category = "restaurant"
            break;
        case 3:
            category = "activity"
            break;
        default:
            category=""
            break;
    }
    return category
}
   
}
