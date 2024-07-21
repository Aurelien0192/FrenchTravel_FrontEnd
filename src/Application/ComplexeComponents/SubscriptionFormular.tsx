/* formulaire de souscription

Selon le type de compte (user ou professional), les informations obligatoires vont être différentes. le type de compte est stocké dans
le hook useState isProfessional. Si le hoob est false, le nom et prénom sont facultatifs, sinon il le sont.

A la soumission du formulaire, on appelle par le biais de la fonction changeMsg la fontion addResponseServer de la class FormularServices.
On passe à la fonction la fonction handleSubmit (rôle est de faire la demande serveur d'ajout d'un nouvel utilisateur et de retourner la réponse.)
addResponseServer de la class FormularServices à pour rôle de traiter le retour de l'information et de fournir un message à afficher en fonction de la réponse
du serveur. */

import { Checkbox } from "@mantine/core"
import { Input } from "../Components/Input"
import { Button } from "../Components/Button"
import { useState } from "react"
import { subscriptionFormularService } from "../../Module/SubscriptionFormular/SubscriptionFormular.services"
import { useResponseAxios } from "../../Module/HTTP/axiosResponse.hook"
import { FormularServices } from "../../Module/FormularGeneralServices/formularServices"


export const SubscriptionFormular:React.FC = () => {
    const {responseServer} = useResponseAxios()    
    const [msg, setMsg] = useState<string>("")
    const [isProfessional, setIsProfessionnel] = useState<boolean>(false)

    const changeMsg = async (e:React.FormEvent<HTMLFormElement>) => {
      const newMsg = await FormularServices.addResponseOfServer(subscriptionFormularService.handleSubmit(e),"user")
      setMsg(newMsg)
    }

    return(
        <form onSubmit={(e)=>{changeMsg(e)}} className="flex flex-col gap-5 items-center">
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