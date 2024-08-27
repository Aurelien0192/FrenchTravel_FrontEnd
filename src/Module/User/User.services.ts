import { AxiosResponse } from "axios";
import { AxiosServices } from "../HTTP/axios.services";
import { UserToSubmit, UserToUpdate } from "./User.class";

import { userPasswordResData, userToSubmit, userToUpdate } from "./User.type";
import { axiosResponseError } from "../HTTP/axiosResponseError.type";
import { AxiosResponseError } from "../HTTP/axiosResponseError.dto";

export class UserServices{
    static async postNewUser(data: userToSubmit){
        const userToSubmit = UserToSubmit.createNewUserToSUbmit(data)
        let response = await AxiosServices.postInDataBase("/user",userToSubmit)
        return response
    }

    static async resPassword(e:React.FormEvent<HTMLFormElement>){
        const form : HTMLFormElement = e.currentTarget
        const formData = new FormData(form)
        const formJSON = Object.fromEntries(formData.entries())
        const data: userPasswordResData = JSON.parse(JSON.stringify(formJSON))
        if(data.password === data.confirmPassword){
            const dataSend = {email: data['email'], password: data.password}
            let response:AxiosResponse = await AxiosServices.updateElementOnServer('/resPassword',dataSend) as AxiosResponse
            return AxiosResponseError.createNewResponseError(response.data, response.status)
        }else{
            const response:axiosResponseError = {
                msg: "le mot de passe renseigné ne correspond pas à la confirmation",
                fields_with_error:["password","confirmPassword"],
                fields:{msg:""},
                type_error: "no-valid"
            
            }
            const responseError = AxiosResponseError.createNewResponseError(response, 1)
            return responseError
        }
    }

    static async updateUser(data: userToUpdate){
        const userToUpdate = UserToUpdate.createNewUserToUpdate(data)
        try{
            const response: AxiosResponse = await AxiosServices.updateElementOnServer(`/user/${JSON.parse(sessionStorage.getItem("UserAuthentifiate")as string).data._id }`,userToUpdate) as AxiosResponse
            return response
        }catch(e){
            console.log(e)
        }
    }
}