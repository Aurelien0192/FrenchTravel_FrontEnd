/* Header Component*/



import { Button } from "../Components/Button"
import logoTravel from "../../../public/Logo/logoTravel 1.svg"
import { Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { SubscriptionFormular } from "./SubscriptionFormular"

export const Header:React.FC = () => {
    const [opened,{ open, close }] = useDisclosure(false)
    return(
        <div className="flex justify-between items-center">
            <img src={logoTravel} />
            <div className="flex gap-3 mr-8">
                <Button size={"md"} onClick={open} variant="light">S'inscrire</Button>
                <Button size={"md"} variant="light">Se connecter</Button>
                <Modal
                    opened={opened}
                    onClose={close}
                    centered
                    overlayProps={{
                        backgroundOpacity:0.30,
                        color:'#D98D30',
                        blur:3,
                    }}
                    >
                    <SubscriptionFormular/>
                </Modal>
            </div>
        </div>
    )
}