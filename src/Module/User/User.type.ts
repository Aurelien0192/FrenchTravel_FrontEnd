import { image } from "../Image/Image.type"

export type userToSubmit = {
    firstName: string
    lastName: string
    userType: string
    username: string
    password: string
    email:string
}

export type userToUpdate = {
    firstName: string
    lastName: string
    username: string
    password: string
    email:string
    about:string
}

export type userFromServer = {
    username: string
    profilePhoto: image
}

export type userPasswordResData = {
    email: string,
    password: string,
    confirmPassword : string,
}