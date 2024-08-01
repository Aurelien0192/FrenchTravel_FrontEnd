import { userToSubmit, userToUpdate } from "./User.type"

export class UserToSubmit{
    public firstName: string
    public lastName: string
    public userType: "professional"|"user"
    public username: string
    public password: string
    public email:string

    constructor(userToSubmit : userToSubmit){
        this.firstName = userToSubmit.firstName
        this.lastName = userToSubmit.lastName
        this.userType = userToSubmit.userType === "on"? "professional": "user"
        this.username = userToSubmit.username
        this.password = userToSubmit.password
        this.email = userToSubmit.email
    }

    static createNewUserToSUbmit(user : userToSubmit):UserToSubmit{
        const userToSubmit = new UserToSubmit(user)
        return(userToSubmit)
    }
}

export class UserToUpdate{
    public firstName: string
    public lastName: string
    public username: string
    public email:string
    public about:string

    constructor(userFromFormular:userToUpdate){
        this.firstName = userFromFormular.firstName
        this.lastName = userFromFormular.lastName
        this.username = userFromFormular.username
        this.email = userFromFormular.email
        this.about = userFromFormular.about
    }

    static createNewUserToUpdate(userFromFormular:userToUpdate):UserToUpdate{
        const userToUpdate = new UserToUpdate(userFromFormular)
        return(userToUpdate)
    }
}