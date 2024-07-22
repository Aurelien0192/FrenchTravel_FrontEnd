import { Checkbox } from "@mantine/core"
import { Input } from "../Components/Input"
import { Button } from "../Components/Button"
import { FormularServices } from "../../Module/FormularGeneralServices/formularServices"
import { useResponseAxios } from "../../Module/HTTP/axiosResponse.hook"
import { useState } from "react"
import { AuthentificationServices } from "../../Module/Authentification/Authentification.service"
import { useAuthentification } from "../../Module/Authentification/authentification.hook"

export const ConnectionFormular: React.FC = () => {

    const {responseServer} = useResponseAxios()    
    const [msg, setMsg] = useState<string>("")

    const changeMsg = async (e:React.FormEvent<HTMLFormElement>) => {
        const newMsg = await FormularServices.addResponseOfServer(AuthentificationServices.handleSubmit(e),"login")
      setMsg(newMsg)
    }

    const { authentifiateUser } = useAuthentification()
    console.log(authentifiateUser)

    return(
        <form className="flex flex-col gap-5 items-center" onSubmit={(e) => changeMsg(e)}>
            <h1 className="text-2xl font-bold w-full text-center">Heureux de vous revoir !</h1>
            <p className={`w-full  text-center ${responseServer?.getStatus && responseServer?.getStatus()===201?'text-green-500':'text-red-500'}`}>{msg}</p>
            <div className=" flex flex-col gap-5 w-full">
                <Input label="Pseudonyme" placeholder="henry.dupont@mail.com" name="username" flexDirection="flex-col" />
                <Input label="Mot de passe" type="password" placeholder="*********" name="password" flexDirection="flex-col" />
            </div>
            <p className="text-brown underline underline-offset-2">mot de passe oublié?</p>
            <Checkbox name="save" label="se souvenir de moi" color="#D98D30" variant="outline" size="md"/>
            <Button type="submit" size="md">Se connecter</Button>
            <p className="text-center">Vous n'avez pas de compte? inscrivez-vous pour pouvoir accéder au meilleur de French TRAVEL</p>
        </form>
    )
}