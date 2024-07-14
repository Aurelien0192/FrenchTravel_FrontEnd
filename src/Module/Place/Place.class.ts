import { moreInfo, placeSubmit } from "./Place.type"

export class PlaceToSubmit{
    public name: string
    public categorie: string
    public describe: string
    public moreInfo: moreInfo
    public street: string
    public city: string
    public codePostal: string
    public county: string
    public phone: string|null
    public typeOfPlace: Array<string>
    public email: string
    public bookingLink: string
    public images : Array<File>

    constructor(data:placeSubmit,photos:Array<File>){
        this.name = data.name
        this.categorie = data.categorie
        this.describe = data.describe
        this.street = data.street
        this.city = data.city
        this.codePostal = data.codePostal
        this.county = data.county
        this.phone = data.phone
        this.typeOfPlace = [data.underCategorie1, data.underCategorie2]
        this.email = data.email
        this.bookingLink = data.bookingLink
        this.images = photos
        this.setInfoSup(data)

    }

    setInfoSup(data:placeSubmit){

        switch(data.categorie){
            case "restaurant":
                this.moreInfo = {
                    cook: data.cook as string,
                    services:data.services,
                    price:[Number(data.price1), Number(data.price2)]
                }
                break;
            case "hotel":
                this.moreInfo = {
                    services: data.services,
                    equipment: data.equipment as string,
                    accessibility: data.accessibility as string

                }
                break;
            case "activity":
                this.moreInfo = {
                    schedules:[{
                        day:"monday",
                        open:data.mondayOpen,
                        close:data.mondayClose
                    },{
                        day:"monday",
                        open:data.tuesdayOpen,
                        close:data.tuesdayClose
                    },{
                        day:"monday",
                        open:data.wednesdayOpen,
                        close:data.wednesdayClose
                    },{
                        day:"monday",
                        open:data.thursdayOpen,
                        close:data.thursdayClose
                    },{
                        day:"monday",
                        open:data.frisdayOpen,
                        close:data.frisdayClose
                    },{
                        day:"monday",
                        open:data.saturdayOpen,
                        close:data.saturdayClose
                    },{
                        day:"monday",
                        open:data.sundayOpen,
                        close:data.sundayClose
                    }],
                    duration: data.duration,
                }
                break;
        }
    }

}