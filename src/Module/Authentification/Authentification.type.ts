export type authentificationRequestData = {
    username: string,
    password: string,
    save:string
}

export type authentificationLocal = {
    _id:string,
    token:string
    username:string
    userType:string
}