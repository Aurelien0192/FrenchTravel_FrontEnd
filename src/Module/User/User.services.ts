import { AxiosServices } from "../HTTP/axios.services";
import { UserToSubmit } from "./User.class";

import { userToSubmit } from "./User.type";

export class UserServices{
    static async postNewUser(data: userToSubmit){
        const userToSubmit = UserToSubmit.createNewUserToSUbmit(data)
        let response = await AxiosServices.postInDataBase("/user",userToSubmit)
        return response?.status
    }
}