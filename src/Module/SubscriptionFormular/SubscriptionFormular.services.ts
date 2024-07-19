import { FormEvent } from "react"
import { userToSubmit } from "../User/User.type"
import { UserServices } from "../User/User.services"

class SubscriptionFormularService{
    async handleSubmit(e:FormEvent<HTMLFormElement>, ){
    
    e.preventDefault()

    const form : HTMLFormElement = e.currentTarget
    const formData = new FormData(form)
    const formJson =Object.fromEntries(formData.entries())
    if(formJson.password === formJson.passwordValidation){
        const data: userToSubmit = JSON.parse(JSON.stringify(formJson))
        const statusCode:number = await UserServices.postNewUser(data) as number
        return statusCode
    }else{
        console.log("ok")
        return 1
    }
  }
}

export const subscriptionFormularService = new SubscriptionFormularService