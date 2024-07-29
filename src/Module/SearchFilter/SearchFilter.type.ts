export type searchFilter = {    
    search : string
    notation? : number
    hotelCategorie? : number
    categorie? : "hotel"|"restaurant"|"activity"
}

export type SearchParameters = {
    [key:string] :string
}