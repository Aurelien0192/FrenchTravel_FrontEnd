import { Checkbox, Modal } from "@mantine/core"
import { Input } from "../../Components/General/Input"
import { Button } from "../../Components/General/Button"
import { FormularServices } from "../../../Module/FormularGeneralServices/formularServices"
import { useResponseAxios } from "../../../Module/HTTP/axiosResponse.hook"
import { useState } from "react"
import { AuthentificationServices } from "../../../Module/Authentification/Authentification.service"
import { useDisclosure } from "@mantine/hooks"
import { UserServices } from "../../../Module/User/User.services"

type connectionFomularProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const ConnectionFormular: React.FC<connectionFomularProps> = (props) => {

    const {responseServer} = useResponseAxios()    
    const [msg, setMsg] = useState<string>("")
    const [openedResPassword, openedResPasswordManager] = useDisclosure()
    const[checkBoxSelect, setCheckboxSelect] = useState<boolean>(false)

    const changeMsg = async (e:React.FormEvent<HTMLFormElement>) => {
        const newMsg = await FormularServices.addResponseOfServer(AuthentificationServices.handleSubmit(e),"login")
      setMsg(newMsg)
    }

    const changeMsgResPassword = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newMsg = await FormularServices.addResponseOfServer(UserServices.resPassword(e),"user")
        setMsg(newMsg)
    }

    return(
        <div>
            <form className="flex flex-col mb-5 gap-5 items-center" onSubmit={(e) => changeMsg(e)}>
                <h1 className="text-2xl font-bold w-full text-center">Heureux de vous revoir !</h1>
                <p className={`w-full  text-center ${responseServer?.getStatus && responseServer?.getStatus()===201?'text-green-500':'text-red-500'}`}>{msg}</p>
                <div className=" flex flex-col gap-5 w-full">
                    <Input label="Utilisateur" placeholder="henry.dupont" name="username" flexDirection="flex-col" />
                    <Input label="Mot de passe" type="password" placeholder="*********" name="password" flexDirection="flex-col" />
                </div>
                <button type="button" onClick={() => {setMsg("");openedResPasswordManager.open()}} className="text-brown underline underline-offset-2">mot de passe oublié?</button>
                <Checkbox onChange={() => {setCheckboxSelect(!checkBoxSelect)}} name="save" label="se souvenir de moi" color="#D98D30" variant="outline" size="md"/>
                <p className={`text-center font-bold ${!checkBoxSelect && "hidden"}`} >Vos données de connexion seront stockées sur votre terminal via le LocalStorage. Décocher se souvenir de mois si vous refuser ce stockage</p>
                <Button type="submit" size="md">Se connecter</Button>
            </form>
            <Modal
                    opened={openedResPassword}
                    onClose={openedResPasswordManager.close}
                    centered
                    overlayProps={{
                        backgroundOpacity:0.30,
                        color:'#D98D30',
                        blur:3,
                    }}
                >
                    <form onSubmit={(e)=>{changeMsgResPassword(e)}} className="flex flex-col gap-5 items-center">
                        <h2 className="text-xl">Réinitialiser mot de passe</h2>
                        <p className={`w-full  text-center ${responseServer?.getStatus && responseServer?.getStatus()===201?'text-green-500':'text-red-500'}`}>{msg}</p>
                        <Input label="Adresse e-mail" flexDirection="flex-col" placeholder="henry.dupond@mail.com" name="email" />
                        <Input label="Nouveau mot de passe" flexDirection="flex-col" placeholder="*******" type="password" name="password" />
                        <Input label="Confirmer nouveau mot de passe" flexDirection="flex-col" placeholder="*******" type="password" name="confirmPassword" />
                        <Button type="submit">Valider</Button>
                    </form>
                </Modal>
            <button onClick={props.onClick} className="text-center transition-all hover:shadow-lg">Vous n'avez pas de compte? inscrivez-vous pour pouvoir accéder au meilleur de French TRAVEL</button>
        </div>
    )
}