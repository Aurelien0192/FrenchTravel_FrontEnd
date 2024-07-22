/* Header Component*/



import { Button } from "../Components/Button"
import logoTravel from "../../../public/Logo/logoTravel 1.svg"
import { Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { SubscriptionFormular } from "./SubscriptionFormular"
import { ConnectionFormular } from "./ConnectionFomular"

export const Header:React.FC = () => {
    const [openedSubscription, manageSubscription] = useDisclosure(false)
    const [openedConnection, manageConnection] = useDisclosure(false)

    return(
        <div className="flex justify-between items-center">
            <img src={logoTravel} />
            <div className="flex gap-3 mr-8">
                <Button size={"md"} onClick={manageSubscription.open} variant="light">S'inscrire</Button>
                <Button size={"md"} onClick={manageConnection.open} variant="light">Se connecter</Button>
                <Modal
                    opened={openedSubscription}
                    onClose={manageSubscription.close}
                    centered
                    overlayProps={{
                        backgroundOpacity:0.30,
                        color:'#D98D30',
                        blur:3,
                    }}
                    >
                    <SubscriptionFormular/>
                </Modal>
                <Modal
                opened={openedConnection}
                    onClose={manageConnection.close}
                    centered
                    overlayProps={{
                        backgroundOpacity:0.30,
                        color:'#D98D30',
                        blur:3,
                    }}>
                        <ConnectionFormular />
                </Modal>
            </div>
        </div>
    )
}