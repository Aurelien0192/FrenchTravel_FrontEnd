import { Loader } from "@mantine/core"
import { useAuthentification } from "../../../Module/Authentification/authentification.hook"
import { Button } from "../../Components/General/Button"
import { Input } from "../../Components/General/Input"
import { PhotoProfileDisplay } from "./PhotoProfileDisplay"
import { TextArea } from "../../Components/General/TextArea"
import { UpdateFormularService } from "../../../Module/UpdateFormular/UpdateFormularUser.service"
import { useState } from "react"
import { FormularServices } from "../../../Module/FormularGeneralServices/formularServices"
import { useResponseAxios } from "../../../Module/HTTP/axiosResponse.hook"

export const UpdateFormularUser:React.FC = () => {
    const {responseServer} = useResponseAxios()    
    const {authentifiateUser} = useAuthentification()
    const [msg, setMsg] = useState<string>("")

    const changeMsg = async (e:React.FormEvent<HTMLFormElement>) => {
      const newMsg = await FormularServices.addResponseOfServer(UpdateFormularService.handleSubmit(e),"updateUser")
      setMsg(newMsg)
    }

 return(
    <div>
        <p className={`w-full  text-center ${responseServer?.getStatus && responseServer?.getStatus()===201?'text-green-500':'text-red-500'}`}>{msg}</p>
        <div className="flex justify-between">
            <div className="flex flex-col gap-2 items-start w-fit h-fit">
                <PhotoProfileDisplay />
                <Button variant="transparent">Supprimer le profil</Button>
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
                </form>:<Loader />}
        </div>
    </div>
 )
}