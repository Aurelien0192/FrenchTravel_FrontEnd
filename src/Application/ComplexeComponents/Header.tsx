/* Header Component*/



import { Button } from "../Components/Button"
import logoTravel from "../../../public/Logo/logoTravel 1.svg"
import { Modal } from "@mantine/core"
import { useClickOutside, useDisclosure } from "@mantine/hooks"
import { SubscriptionFormular } from "./SubscriptionFormular"
import { ConnectionFormular } from "./ConnectionFomular"
import { useAuthentification } from "../../Module/Authentification/authentification.hook"
import { IoChevronDown } from "react-icons/io5";
import { FaUser } from "react-icons/fa"
import { BiLogOutCircle } from "react-icons/bi"
import { useState } from "react"
import { MdAddBusiness } from "react-icons/md"
import { NavLink } from "react-router-dom"


export const Header:React.FC = () => {
    const [openedSubscription, manageSubscription] = useDisclosure(false)
    const [openedConnection, manageConnection] = useDisclosure(false)
    const [hidden, setHidden] = useState(true)
    const ref = useClickOutside(() => setHidden(true))

    const { authentifiateUser} = useAuthentification()
    console.log(authentifiateUser)
    const disconnect = () => {
        sessionStorage.removeItem("UserAuthentifiate")
        window.location.reload()
    }

    if(Object.keys(authentifiateUser).length>0){
        return(
            <div className="flex justify-between items-center">
                <img src={logoTravel} />
                <div className="relative">
                    <div className="cursor-pointer" onClick={() => setHidden(false)}>
                    <img className="size-10 rounded-full" src={authentifiateUser.getProfilePhoto()} />
                        <div className="bg-sand w-fit rounded-full absolute top-7 left-7">
                            <IoChevronDown color={"#8C3616"} />
                        </div>
                    </div>
                    {!hidden &&(
                        <div ref={ref}>
                            <div className={`w-fit p-[10px] rounded-xl shadow-xl absolute right-0 bg-white`}>
                                <ul className="w-fill">
                                    <li className="flex gap-[10px] items-center cursor-pointer hover:bg-sand">
                                        <FaUser size={"25px"}  />
                                        <p className="text-2xl font-bold">Profil </p>
                                    </li>
                                    <li >
                                        <NavLink className="flex gap-[10px] items-center cursor-pointer hover:bg-sand" to="/index/AddPlace">
                                            <MdAddBusiness size={'25px'} />
                                            <p className="text-2xl text-nowrap font-bold">Ajouter un lieu</p>
                                        </NavLink>
                                    </li>
                                    <li onClick={disconnect} className="flex gap-[10px] items-center cursor-pointer hover:bg-sand">
                                        <BiLogOutCircle size={"25px"}  />
                                        <p className="text-2xl font-bold">Déconnexion </p>
                                    </li>
                                </ul>
                            </div>
                        </div>)}
                </div>
            </div>
        )
    }
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