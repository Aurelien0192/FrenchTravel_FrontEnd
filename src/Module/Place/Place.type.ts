export type moreInfo = {
    schedules: Array<string>|null
    duration: number|null
    price: Array<number>|null
    diner: string|null
    cook : string|null
    services : string|null
    equipment : string|null
    accessibility:Array<string>|null
}

export type placeSubmit = {
    name: string
    categorie: string
    describe: string
    moreInfo: moreInfo
    street: string
    city: string
    codePostal: string
    county: string
    phone: string
    typeOfPlace: Array<string>
    email: string
    bookingLink: string
}