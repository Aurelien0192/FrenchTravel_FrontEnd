import { AxiosResponse } from "axios";
import { AxiosServices } from "../HTTP/axios.services";
import { UserToSubmit, UserToUpdate } from "./User.class";

import { userToSubmit, userToUpdate } from "./User.type";

export class UserServices{
    static async postNewUser(data: userToSubmit){
        const userToSubmit = UserToSubmit.createNewUserToSUbmit(data)
        let response = await AxiosServices.postInDataBase("/user",userToSubmit)
        return response
    }

    static async updateUser(data: userToUpdate){
        const userToUpdate = UserToUpdate.createNewUserToUpdate(data)
        console.log(userToUpdate)
        try{
            const response: AxiosResponse = await AxiosServices.updateElementOnServer(`/user/${JSON.parse(sessionStorage.getItem("UserAuthentifiate")as string).data._id }`,userToUpdate) as AxiosResponse
            return response
        }catch(e){
            console.log(e)
        }
    }
}