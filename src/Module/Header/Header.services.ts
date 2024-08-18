import { AuthentificationServices } from "../Authentification/Authentification.service"
import { FormularServices } from "../FormularGeneralServices/formularServices"
import { router } from "../../Infrastructure/Router/router"

export class HeaderService{
    static async disconnect(){
        const msg = await FormularServices.addResponseOfServer(AuthentificationServices.submitLogout(),"logout")
        if(msg){
            window.alert(msg)
        }else{
            sessionStorage.removeItem("UserAuthentifiate")
            localStorage.getItem("UserAuthentifiate") && localStorage.removeItem("UserAuthentifiate")
            router.navigate('/')
        }
    }
}