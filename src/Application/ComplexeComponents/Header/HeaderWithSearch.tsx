import { Button } from "../../Components/General/Button"
import logoTravel from "../../../../public/Logo/logoTravel 1.svg"
import { Modal } from "@mantine/core"
import { SubscriptionFormular } from "../User/SubscriptionFormular"
import { ConnectionFormular } from "../User/ConnectionFomular"
import { useAuthentification } from "../../../Module/Authentification/authentification.hook"
import { IoChevronDown, IoPerson } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi"
import { NavLinkButton } from "../../Components/General/NavLinkButton"
import { MdAddBusiness } from "react-icons/md"
import { NavLink, useNavigate, createSearchParams } from "react-router-dom"
import { SearchBar } from "../../Components/General/SearchBar"
import { SearchFilterServices } from "../../../Module/SearchFilter/SearchFilter.service"
import { useHeader } from "../../../Module/Header/Header.hook"
import { HeaderService } from "../../../Module/Header/Header.services"


export const HeaderWithSearch:React.FC = () => {

    const {openedSubscription, manageSubscription, openedConnection, manageConnection, hidden, ref, hiddenNavOption} = useHeader()
    const navigate = useNavigate()


    const { authentifiateUser} = useAuthentification()

    if(Object.keys(authentifiateUser).length>0){
        return(
            <div className="flex w-full items-center gap-14">
                <img className="hidden md:inline" src={logoTravel} />
                <div className="hidden md:inline">
                    <Button onClick={() => navigate(-1)} size="xs">Retour</Button>
                </div>
                <SearchBar onSubmit={(e) => {SearchFilterServices.searchPlaces(e);
                navigate({
                    pathname:`/index/search/`,
                    search:`?${createSearchParams({
                        search:`${JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))).search}`,
                    })}`    
                })}} />
                <div className="relative ">
                    <div className="cursor-pointer size-10" onClick={hiddenNavOption}>
                        <img className="size-10 object-cover rounded-full" src={authentifiateUser.getProfilePhoto()} />
                        <div className="bg-sand w-fit rounded-full absolute top-7 left-7">
                            <IoChevronDown color={"#8C3616"} />
                        </div>
                    </div>
                    {!hidden &&(
                        <div ref={ref}>
                            <div className={`w-fit p-[10px] rounded-xl shadow-xl absolute right-0 z-50 bg-white`}>
                                <ul className="w-fill">
                                    <li className="flex gap-[10px] items-center cursor-pointer hover:bg-sand">
                                        <NavLink className="flex gap-[10px] items-center cursor-pointer hover:bg-sand" to={"/index/user/places"}>
                                            <IoPerson size={'25px'} />
                                            <p className="text-2xl text-nowrap font-bold">Profil</p>
                                        </NavLink>
                                    </li>
                                    <li className="flex gap-[10px] items-center cursor-pointer hover:bg-sand">
                                        <NavLink className="flex gap-[10px] items-center cursor-pointer hover:bg-sand" to="/index/AddPlace">
                                            <MdAddBusiness size={'25px'} />
                                            <p className="text-2xl text-nowrap font-bold">Ajouter un lieu</p>
                                        </NavLink>
                                    </li>
                                    <li onClick={() => {HeaderService.disconnect()}} className="flex gap-[10px] items-center cursor-pointer hover:bg-sand">
                                        <BiLogOutCircle size={"25px"}  />
                                        <p className="text-2xl font-bold">Déconnexion </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
    return(
        <div className="flex justify-end w-full md:justify-between flex-col-reverse md:flex-row items-center gap-14">
            <img className="hidden md:inline" src={logoTravel} />
            <div className="hidden md:inline">
                <NavLinkButton to={'/'} size="xs">Retour</NavLinkButton>
            </div>
            <div className="hidden w-full md:inline">
                <SearchBar onSubmit={(e) => {SearchFilterServices.searchPlaces(e);
                navigate({
                    pathname:`/index/search/`,
                    search:`?${createSearchParams({
                        search:`${JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))).search}`,
                    })}`    
                })}} />
            </div>
            <div className="flex w-full md:w-fit justify-between md:gap-3 md:mr-8">
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