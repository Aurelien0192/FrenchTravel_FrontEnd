export type favorite = {
    user:string,
    place:string,
    folder?:string,
    visited:boolean
}

export type responseServerGetManyFavorites={
    count:number,
    results:Array<favorite>
}