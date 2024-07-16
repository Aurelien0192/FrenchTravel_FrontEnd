import { moreInfo, placeSubmit } from "./Place.type"

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
                    price:[Number(data.price1), Number(data.price2)]
                }
            case "hotel":
                return {
                    services: data.services,
                    equipment: data.equipment as string,
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