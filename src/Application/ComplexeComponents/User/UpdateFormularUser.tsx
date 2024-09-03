import { Modal } from "@mantine/core"
import { useAuthentification } from "../../../Module/Authentification/authentification.hook"
import { Button } from "../../Components/General/Button"
import { Input } from "../../Components/General/Input"
import { PhotoProfileDisplay } from "./PhotoProfileDisplay"
import { TextArea } from "../../Components/General/TextArea"
import { UpdateFormularService } from "../../../Module/UpdateFormular/UpdateFormularUser.service"
import { useState } from "react"
import { FormularServices } from "../../../Module/FormularGeneralServices/formularServices"
import { useResponseAxios } from "../../../Module/HTTP/axiosResponse.hook"
import { useDisclosure } from "@mantine/hooks"
import { AxiosResponseError } from "../../../Module/HTTP/axiosResponseError.dto"
import { ProfilService } from "../../../Module/Profil/Profil.service"
import { useNavigate } from "react-router-dom"
import { FrenchTravelAnimated } from "../../Components/svg/FrenchTravelAnimated"

export const UpdateFormularUser:React.FC = () => {
    const {responseServer} = useResponseAxios()    
    const {authentifiateUser} = useAuthentification()
    const navigate = useNavigate()
    const [openedConfirmDeletionUser, manageConfirmDeletionUser] = useDisclosure(false)
    const [msg, setMsg] = useState<string>("")

    const changeMsg = async (e:React.FormEvent<HTMLFormElement>) => {
      const newMsg = await FormularServices.addResponseOfServer(UpdateFormularService.handleSubmit(e),"updateUser")
      setMsg(newMsg)
    }

    async function deleteAccount(){
        const response:AxiosResponseError = await ProfilService.deleteUser(`/user/${authentifiateUser.getId()}`)
        if(response.getStatus() === 200){
            sessionStorage.removeItem("UserAuthentifiate")
            window.alert("votre compte a bien été supprimé")
            navigate("/")
            window.location.reload()
        }else{
            window.alert(response.getMsg())
        }
    }

 return(
    <div>
        <p className={`w-full text-center ${responseServer?.getStatus && responseServer?.getStatus()===200?'text-green-500':'text-red-500'}`}>{msg}</p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between">
            <div className="flex flex-col gap-2 items-center md:items-start w-full md:w-fit h-fit">
                <PhotoProfileDisplay />
                <Button variant="transparent" onClick={manageConfirmDeletionUser.open}>Supprimer le profil</Button>
                <Modal
                    opened={openedConfirmDeletionUser}
                    onClose={manageConfirmDeletionUser.close}
                    centered
                    overlayProps={{
                        backgroundOpacity:0.30,
                        color:'#D98D30',
                        blur:3,
                    }}
                    >
                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-bold text-red-500">Attention!</h3>
                        <div className="flex flex-col gap-1">
                            <p>Vous allez effectuer une action irréversible</p>
                            <p>Toutes les informations liées à votre compte vont être supprimées</p>
                        </div>
                            <p>Voulez-vous continuer?</p>
                        <div className="flex justify-between">
                            <Button onClick={manageConfirmDeletionUser.close}>Annuler</Button>
                            <Button onClick={deleteAccount}>Confirmer</Button>
                        </div>
                    </div>
                </Modal>
            </div>
            {Object.keys(authentifiateUser).length>0 ?
                <form className="flex flex-col gap-6 items-end" onSubmit={(e) => {e.preventDefault;changeMsg(e)}}>
                    <div className="flex gap-14">
                        <Input name="firstName" value={authentifiateUser.getFirstName()} placeholder="Non renseigné" label="Prénom" flexDirection="flex-col" />
                        <Input name="lastName" value={authentifiateUser.getLastName()} placeholder="Non renseigné" label="Nom" flexDirection="flex-col" />
                    </div>
                    <Input name="username" value={authentifiateUser.getUsername()} placeholder="Obligatoire" label="Utilisateur" flexDirection="flex-col" />
                    <Input name="email" value={authentifiateUser.getEmail()} placeholder="Obligatoire" label="Email" flexDirection="flex-col" />
                    <TextArea name="about" value={authentifiateUser.getAbout()} placeholder="Parlez de vous, de vos attentes, de vos rêves, de vos envies" size="xs" label="A propos de vous (150 caractères maximum)" flexDirection="flex-col" />
                    <div>
                        <Button variant="transparent" type="submit">Enregistrer</Button>
                    </div>
                </form>:<FrenchTravelAnimated />}
        </div>
    </div>
 )
}