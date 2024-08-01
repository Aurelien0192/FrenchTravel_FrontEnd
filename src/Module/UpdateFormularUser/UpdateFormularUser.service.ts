import { FormEvent } from "react"
import { userToUpdate } from "../User/User.type"
import { AxiosResponse } from "axios"
import { UserServices } from "../User/User.services"
import { AxiosResponseError } from "../HTTP/axiosResponseError.dto"
import { AuthentifiateUser } from "../Authentification/Authentification.class"
import { authentificationService } from "../Authentification/Authentification.service"

export class UpdateFormularService{
    static async handleSubmit(e:FormEvent<HTMLFormElement>, ){
    
    e.preventDefault()

    const form : HTMLFormElement = e.currentTarget
    const formData = new FormData(form)
    const formJson =Object.fromEntries(formData.entries())
    const data: userToUpdate = JSON.parse(JSON.stringify(formJson))
    const responseOfServer:AxiosResponse = await UserServices.updateUser(data) as AxiosResponse
    if(responseOfServer.status===200){
      const newUser: AuthentifiateUser = AuthentifiateUser.createAuthentifiateUser(responseOfServer)
      sessionStorage.setItem("UserAuthentifiate",JSON.stringify(responseOfServer))
      authentificationService.updateAuthentifiateUser(newUser)
    }
    const axiosResponseError = AxiosResponseError.createNewResponseError(responseOfServer.data,responseOfServer.status)
    return axiosResponseError
  }
}