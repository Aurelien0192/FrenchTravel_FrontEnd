import { moreInfo, place, placeSubmit } from "./Place.type"
import { image } from "../Image/Image.type"
import { Comment } from "../Comment/comment.class"
export class PlaceToSubmit{
    public name: string
    public categorie: string
    public describe: string
    public moreInfo: moreInfo|null
    public street: string
    public city: string
    public codePostal: string
    public county: string
    public country: string
    public phone: string|null
    public typeOfPlace: Array<string>
    public email: string
    public bookingLink: string

    constructor(data:placeSubmit){
        this.name = data.name
        this.categorie = data.categorie
        this.describe = data.describe
        this.street = data.street
        this.city = data.city
        this.codePostal = data.codePostal
        this.county = data.county
        this.country = "France"
        this.phone = data.phone
        this.typeOfPlace = [data.underCategorie1, data.underCategorie2]
        this.email = data.email
        this.bookingLink = data.bookingLink
        this.moreInfo = this.setInfoSup(data)

    }

    setInfoSup(data:placeSubmit){

        switch(data.categorie){
            case "restaurant":
                return {
                    cook: data.cook as string,
                    services:data.services,
                    price:[data.price1 ? Number(data.price1): 0,data.price2 ? Number(data.price2):0]
                }
            case "hotel":
                return {
                    services: data.services,
                    equipment: data.equipment as string,
                    hotelCategorie : data.hotelCategorie as number,
                    accessibility: data.accessibility as string

                }
                break;
            case "activity":
                return {
                    schedules:[{
                        day:"monday",
                        open:data.mondayOpen,
                        close:data.mondayClose
                    },{
                        day:"tuesday",
                        open:data.tuesdayOpen,
                        close:data.tuesdayClose
                    },{
                        day:"wednesday",
                        open:data.wednesdayOpen,
                        close:data.wednesdayClose
                    },{
                        day:"thursday",
                        open:data.thursdayOpen,
                        close:data.thursdayClose
                    },{
                        day:"friday",
                        open:data.fridayOpen,
                        close:data.fridayClose
                    },{
                        day:"saturday",
                        open:data.saturdayOpen,
                        close:data.saturdayClose
                    },{
                        day:"sunday",
                        open:data.sundayOpen,
                        close:data.sundayClose
                    }],
                    duration: data.duration,
                }
            default :
                return null
        }
    }

    static createNewPlaceToSubmit(data:placeSubmit):PlaceToSubmit{
        const new_placeToSubmit = new PlaceToSubmit(data)
        return new_placeToSubmit
    }

}

export class Place{
    private readonly id: string
    private owner: string
    private name : string
    private categorie: "activity"|"restaurant"|"hotel"
    private typeOfPlace: Array<string>
    private describe : string
    private email: string
    private phone : string
    private moreInfo : moreInfo
    private street : string
    private city: string
    private codePostal: string
    private county: string
    private country: string
    private latCoordinate: number
    private lonCoordinate: number
    private notation:number
    private numberOfNote:number
    private images : Array<image>
    private comment : Comment|null

    constructor(placeFromApi : place){
        console.log(placeFromApi.comments)
        this.id = placeFromApi._id
        this.owner = placeFromApi.owner
        this.name = placeFromApi.name
        this.categorie = placeFromApi.categorie
        this.typeOfPlace = placeFromApi.typeOfPlace
        this.describe = placeFromApi.describe
        this.email = placeFromApi.email
        this.phone = placeFromApi.phone
        this.moreInfo = placeFromApi.moreInfo
        this.street = placeFromApi.street
        this.city = placeFromApi.city
        this.codePostal = placeFromApi.codePostal
        this.county = placeFromApi.county
        this.country = placeFromApi.country
        this.latCoordinate = placeFromApi.latCoordinate
        this.lonCoordinate = placeFromApi.lonCoordinate
        this.notation = placeFromApi.notation ? placeFromApi.notation : 0
        this.numberOfNote = placeFromApi.numberOfNote ? placeFromApi.numberOfNote : 0
        this.images = placeFromApi.images
        this.setImagesPath()
        this.comment = (placeFromApi.comments && placeFromApi.comments.length===1) ? Comment.createNewComment(placeFromApi.comments[0]) : null
    }

    setImagesPath(){
        this.images.forEach((image)=>{
            image.path = "http://localhost:3001/"+image.path
        })
    }

    getId(){
        return this.id
    }

    getOwner(){
        return this.owner
    }

    getName(){
        return this.name
    }

    getCategorie(){
        return this.categorie
    }

    getTypeOfPlace(){
        return this.typeOfPlace
    }

    getDescribe(){
        return this.describe
    }

    getEmail(){
        return this.email
    }

    getPhone(){
        return this.phone
    }

    getMoreInfo(){
        return this.moreInfo
    }
    
    getStreet(){
        return this.street
    }

    getCity(){
        return this.city
    }

    getCodePostal(){
        return this.codePostal
    }

    getCounty(){
        return this.county
    }

    getCountry(){
        return this.country
    }

    getLatCoordinate(){
        return this.latCoordinate
    }

    getLonCoordinate(){
        return this.lonCoordinate
    }

    getNotation(){
        return this.notation
    }

    getNumberOfNote(){
        return this.numberOfNote
    }

    getImage(){
        return this.images
    }

    getComment(){
        return this.comment
    }

    static createNewPlace(placeApi : place):Place{
        const newPlace = new Place(placeApi)
        return newPlace
    }
}