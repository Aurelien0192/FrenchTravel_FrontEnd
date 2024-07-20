import { FormEvent } from "react"
import { userToSubmit } from "../User/User.type"
import { UserServices } from "../User/User.services"
import { AxiosResponseError } from "../HTTP/axiosResponseError.dto"
import { AxiosResponse } from "axios"
import { axiosResponseError } from "../HTTP/axiosResponseError.type"

class SubscriptionFormularService{
    async handleSubmit(e:FormEvent<HTMLFormElement>, ){
    
    e.preventDefault()

    const form : HTMLFormElement = e.currentTarget
    const formData = new FormData(form)
    const formJson =Object.fromEntries(formData.entries())
    if(formJson.password === formJson.passwordValidation){
        const data: userToSubmit = JSON.parse(JSON.stringify(formJson))
        const responseOfServer:AxiosResponse = await UserServices.postNewUser(data) as AxiosResponse
        const axiosResponseError = AxiosResponseError.createNewResponseError(responseOfServer.data,responseOfServer.status)
        return axiosResponseError
    }else{
        const errorMsg:axiosResponseError={
            msg: "Les mots de passe ne correspondent pas",
            fields_with_error:["password","passwordValidation"],
            fields:{msg:""},
            type_error:"no-valid"
        }
        const axiosResponseError = AxiosResponseError.createNewResponseError(errorMsg,1)
        return axiosResponseError
    }
  }
}

export const subscriptionFormularService = new SubscriptionFormularService