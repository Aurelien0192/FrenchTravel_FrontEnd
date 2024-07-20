import { Checkbox } from "@mantine/core"
import { Input } from "../Components/Input"
import { Button } from "../Components/Button"
import { useState } from "react"
import { subscriptionFormularService } from "../../Module/SubscriptionFormular/SubscriptionFormular.services"
import { AxiosResponseServices, axiosResponseServices } from "../../Module/HTTP/axiosResponse.services"
import { AxiosResponseError } from "../../Module/HTTP/axiosResponseError.dto"
import { useResponseAxios } from "../../Module/HTTP/axiosResponse.hook"
import { FormularServices } from "../../Module/FormularGeneralServices/formularServices"


export const SubscriptionFormular:React.FC = () => {
    const {responseServer} = useResponseAxios()    
    const [msg, setMsg] = useState<string>("")

    const addResponseOfServer= async (responseAxiosClass:Promise<AxiosResponseError>)=>{
        const responseAxios:AxiosResponseError = await responseAxiosClass
        axiosResponseServices.updateAxiosResponse(responseAxios)
        setMsg(AxiosResponseServices.responseServerPostUser(responseAxios.getStatus()))
        if(responseAxios.getStatus()=== 201){
            setTimeout(()=>{
                window.location.reload()
            },2000)
        }else{
            responseAxios!.getFieldsWithError()?.forEach((e) =>{
                FormularServices.showError(e)
            })
        }
    }
        
    const [isProfessional, setIsProfessionnel] = useState<boolean>(false)
    return(
        <form onSubmit={(e)=>{addResponseOfServer(subscriptionFormularService.handleSubmit(e))}} className="flex flex-col gap-5 items-center">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold w-full text-center">Inscrivez-vous</h1>
                    <p className={`w-full  text-center ${responseServer?.getStatus()===201?'text-green-500':'text-red-500'}`}>{msg}</p>
                </div>
                <div className="flex gap-3">
                    <Input name="firstName" placeholder="John" flexDirection="flex-col" label={`Prénom${isProfessional ? "*":""}`}></Input>
                    <Input name="lastName" placeholder="Doe" flexDirection="flex-col" label={`Nom${isProfessional? "*":""}`}></Input>
                </div>
                <Input name="userName" placeholder="johndoe" flexDirection="flex-col" label="Pseudonyme*"></Input>
                <Input name="email" placeholder="john.doe@mail.fr" flexDirection="flex-col" label="Adresse E-mail*"></Input>
                <Input name="password" placeholder="********" type="password" flexDirection="flex-col" label="Mot de passe*"></Input>
                <Input name="passwordValidation" placeholder="********" type="password" flexDirection="flex-col" label="Mot de passe*"></Input>
                <Checkbox name="userType" checked={isProfessional} onChange={(e)=> setIsProfessionnel(e.currentTarget.checked)}label="Compte Professionnel" color="#D98D30" variant="outline" size="md"/>
            </div>
            <p className="w-full">*Champs Obligatoires</p>
            <Button type="submit" size="md">S'inscrire</Button>
            <p className="w-5/6 text-center"> En poursuivant, vous acceptez nos Conditions d'utilisation et vous confirmez que vous avez lu notre Politique de confidentialité et d'utilisation des cookies.</p>
        </form>
    )
}