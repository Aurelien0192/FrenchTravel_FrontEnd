export type moreInfo = {
    schedules?: Array<schedules>
    duration?: number
    price?: Array<number|undefined>
    cook?: string
    services?: string
    equipment?: string
    accessibility?:string
    hotelCategorie?:number
}

export type schedules = {
    day: string,
    open : string,
    close : string
}

export type placeSubmit = {
    name: string
    categorie: string
    describe: string
    cook: string|null
    price1:string
    price2:string
    services:string
    equipment:string|null
    accessibility:string|null
    hotelCategorie:number|null
    mondayOpen:string
    mondayClose:string
    tuesdayOpen:string
    tuesdayClose:string
    wednesdayOpen:string
    wednesdayClose:string
    thursdayOpen:string
    thursdayClose:string
    fridayOpen:string
    fridayClose:string
    saturdayOpen:string
    saturdayClose:string
    sundayOpen:string
    sundayClose:string
    underCategorie1: string
    underCategorie2:string
    duration:number
    street: string
    city: string
    codePostal: string
    county: string
    phone: string
    typeOfPlace: Array<string>
    email: string
    bookingLink: string
}