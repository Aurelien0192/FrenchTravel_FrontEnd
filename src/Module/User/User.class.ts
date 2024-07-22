import { userToSubmit } from "./User.type"

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