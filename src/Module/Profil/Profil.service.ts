import { AxiosResponse } from "axios"
import { AxiosServices } from "../HTTP/axios.services"
import { authentificationService } from "../Authentification/Authentification.service"
import { AuthentifiateUser } from "../Authentification/Authentification.class"

export class ProfilService{
    
    static async changeProfilPhotos(photo:File){
        const response:AxiosResponse = await AxiosServices.postImageProfil(photo)
        if(response.status===200){
            const user:AxiosResponse = await AxiosServices.getUserFromDatabase(`/user/${JSON.parse(sessionStorage.getItem("UserAuthentifiate")as string).data._id }`) as AxiosResponse
            const newUser: AuthentifiateUser = AuthentifiateUser.createAuthentifiateUser(user)
            sessionStorage.setItem("UserAuthentifiate",JSON.stringify(user))
            authentificationService.updateAuthentifiateUser(newUser)
        }
        return response
    }
}
