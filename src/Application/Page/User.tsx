
import { useAuthentification } from "../../Module/Authentification/authentification.hook"
import { Modal } from "@mantine/core"
import { Button } from "../Components/General/Button"
import { NavLinkButton } from "../Components/General/NavLinkButton"
import { useDisclosure } from "@mantine/hooks"
import { UpdateFormularUser } from "../ComplexeComponents/User/UpdateFormularUser"
import { PhotoProfileDisplay } from "../ComplexeComponents/User/PhotoProfileDisplay"
import { Outlet } from "react-router-dom"


export const UserPage:React.FC = () => {
    const { authentifiateUser } = useAuthentification()
    const [openedProfileModifier, manageProfileModifier] = useDisclosure(false)

  
    return(
        <div className="flex flex-col w-full gap-4">
            <div className="flex justify-between items-center">
                <div className="flex gap-5 items-end">
                    <PhotoProfileDisplay />
                    <div>
                        <h1 className="text-4xl font-medium">{Object.keys(authentifiateUser).length !==0  && authentifiateUser.getUsername()}</h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    {Object.keys(authentifiateUser).length !==0 && authentifiateUser.getUserType()==="professional" && Object.keys(authentifiateUser).length !==0 && <NavLinkButton to={"/index/AddPlace"}variant="transparent">Ajouter un établissement</NavLinkButton>}
                    <Button onClick={manageProfileModifier.open} variant="transparent">Modifier le profil</Button>
                </div>
                <Modal
                    opened={openedProfileModifier}
                    onClose={manageProfileModifier.close}
                    centered
                    size="xl"
                    overlayProps={{
                        backgroundOpacity:0.30,
                        color:'#D98D30',
                        blur:3,
                    }}
                    >
                    <UpdateFormularUser />
                </Modal>
            </div>
            <Outlet />
        </div>
    )
}