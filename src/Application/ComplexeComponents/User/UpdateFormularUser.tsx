import { Loader } from "@mantine/core"
import { useAuthentification } from "../../../Module/Authentification/authentification.hook"
import { Button } from "../../Components/General/Button"
import { Input } from "../../Components/General/Input"
import { PhotoProfileDisplay } from "./PhotoProfileDisplay"
import { TextArea } from "../../Components/General/TextArea"

export const UpdateFormularUser:React.FC = () => {
    const {authentifiateUser} = useAuthentification()
 return(
    <div className="flex justify-between">
        <div className="flex flex-col gap-2 items-start w-fit h-fit">
            <PhotoProfileDisplay />
            <Button variant="transparent">Supprimer le profil</Button>
        </div>
        {Object.keys(authentifiateUser).length>0 ?
            <form className="flex flex-col gap-6 items-end">
                <div className="flex gap-14">
                    <Input name="FirstName" value={authentifiateUser.getFirstName()} placeholder="Non renseigné" label="Prénom" flexDirection="flex-col" />
                    <Input name="LastName" value={authentifiateUser.getLastName()} placeholder="Non renseigné" label="Nom" flexDirection="flex-col" />
                </div>
                <Input name="username" value={authentifiateUser.getUsername()} placeholder="Obligatoire" label="Utilisateur" flexDirection="flex-col" />
                <TextArea name="about" value={authentifiateUser.getAbout()} placeholder="Parlez de vous, de vos attentes, de vos rêves, de vos envies" size="xs" label="A propos de vous (150 caractères maximum)" flexDirection="flex-col" />
                <div>
                    <Button variant="transparent" type="submit">Enregistrer</Button>
                </div>
            </form>:<Loader />}
    </div>
 )
}