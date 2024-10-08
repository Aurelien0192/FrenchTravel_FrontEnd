import { useState } from "react"
import { Place } from "../../../Module/Place/Place.class"
import { Button } from "../../Components/General/Button"
import { TypePlaceLabel } from "../../Components/Place/TypePlaceLabel"
import { useClickOutside, useDisclosure } from "@mantine/hooks"
import { useAuthentification } from "../../../Module/Authentification/authentification.hook"
import { Input } from "../../Components/General/Input"
import { DoubleInput } from "../../Components/General/DoubleInput"
import { SelectInput } from "../../Components/General/SelectInput"
import { FormularServices } from "../../../Module/FormularGeneralServices/formularServices"
import { UpdateFormularPlaceService } from "../../../Module/UpdateFormular/UpdateFormularPlace.service"
import { HotelCategorieOrNoteShow } from "./HotelCategorieOrNotationShow"
import { FavoriteHeart } from "../../Components/svg/favoriteHeart"
import { CustomModal } from "../../Components/General/CustomModal"

type headerPlacePage = {
    dataOnePlace: Place
}


export const HeaderPlacePage:React.FC<headerPlacePage> = (props) => {

    const { authentifiateUser } = useAuthentification()
    const [hiddenContact, setHiddenContact] = useState<boolean>(true)
    const [nameUpdate, nameUpdateManager] = useDisclosure()
    const [contactUpdate, contactUpdateManager] = useDisclosure()
    const ref = useClickOutside(() => {!contactUpdate && setHiddenContact(true)})
    const [msg, setMsg] = useState<string>("")

    const changeMsg = async (e:React.FormEvent<HTMLFormElement>) => {
      const newMsg = await FormularServices.addResponseOfServer(UpdateFormularPlaceService.handleSubmit(e, undefined, props.dataOnePlace!.getId(),props.dataOnePlace.getCategorie()),"updatePlace")
      setMsg(newMsg)
    }

    return(
        <div className="flex flex-col-reverse items-end md:flex-row md:items-start relative justify-between">
            <div className="flex flex-col-reverse md:flex-row md:gap-14 md:items-start w-full">
                <div className="flex flex-col">
                    {props.dataOnePlace.getCategorie() === "hotel" && <HotelCategorieOrNoteShow type="star" categorie={props.dataOnePlace.getMoreInfo().hotelCategorie} />}
                    <div className="flex gap-9 items-center">
                        <h1 className="text-2xl font-bold">{props.dataOnePlace.getName()}</h1>
                        <div className="flex gap-2.5 items-center">
                            <HotelCategorieOrNoteShow type="circle" categorie={props.dataOnePlace.getNotation()} />
                            <p>{props.dataOnePlace.getNumberOfNote()}</p>
                        </div>
                    </div>
                    <p>{`${props.dataOnePlace.getCountry()} > ${props.dataOnePlace.getCounty()} > ${props.dataOnePlace.getCity()}`}</p>
                    <Button onClick={() => setHiddenContact(false)} size="xs">contact</Button>
                </div>
                {Object.keys(authentifiateUser).length>0 && props.dataOnePlace.getOwner() === authentifiateUser.getId() && 
                    <div>
                        <Button onClick={nameUpdateManager.open} size="xs">Modifier</Button>
                        <CustomModal zIndex={1000} opened={nameUpdate} onClose={nameUpdateManager.close} size="lg">
                            <form onSubmit={(e) => {changeMsg(e)}}className="flex flex-col gap-3 items-end">
                                <div className="w-full flex flex-col gap-3">
                                    <Input label="nom" placeholder="Obligatoire" name="name" value={props.dataOnePlace.getName()} />
                                    <DoubleInput placeholder={["facultatif","facultatif"]} label="Sous Categories" name={["underCategorie1","underCategorie2"]} value1={props.dataOnePlace.getTypeOfPlace()[0]} value2={props.dataOnePlace.getTypeOfPlace()[1]} />
                                    <SelectInput
                                        label="Catégorie" 
                                        name="categorie"
                                        options={
                                            [{
                                                name: "Restaurant",
                                                value: "restaurant",
                                                selected: "restaurant" === props.dataOnePlace.getCategorie()
                                            },
                                            {
                                                name: "Hôtel",
                                                value: "hotel",
                                                selected: "hotel" === props.dataOnePlace.getCategorie()
                                            },{
                                                name: "Activité",
                                                value: "activity",
                                                selected: "activity" === props.dataOnePlace.getCategorie()
                                            }]
                                        } 
                                    />
                                </div>
                                <Button size="xs" type="submit">Valider</Button>
                                <p className="text-red-500">{msg}</p>
                            </form>
                        </CustomModal>
                    </div>}
            </div>
            <div className="flex gap-3 items-center">
                {authentifiateUser && Object.keys(authentifiateUser).length>0 && <FavoriteHeart place_id={props.dataOnePlace.getId()} />}
                <TypePlaceLabel labelName={props.dataOnePlace.getCategorie()} />
                {props.dataOnePlace.getTypeOfPlace().length> 0 && props.dataOnePlace.getTypeOfPlace().map((typeOfPlace, index) => {
                    return(
                        <div key={index}>
                            { typeOfPlace.length > 0 && <TypePlaceLabel labelName={typeOfPlace} />}
                        </div>
                    )
                })}
            </div>
            {!hiddenContact &&
                <div className="absolute top-24 left-3 z-50 bg-white rounded-xl shadow-xl p-3" ref={ref}>
                    <ul className="flex flex-col gap-3">
                        <li className="flex gap-3">
                            <p className="font-bold">Adresse : </p>
                            <div className="flex flex-col items-end">
                                <p>{props.dataOnePlace.getStreet()}</p>
                                <p>{`${props.dataOnePlace.getCodePostal()} ${props.dataOnePlace.getCity()}`}</p>
                            </div>
                        </li>
                        <li className="flex justify-between">
                            <p className="font-bold">Téléphone : </p>
                            <div className="flex flex-col items-end">
                                <p>{props.dataOnePlace.getPhone().length>0 ? props.dataOnePlace.getPhone() : "non renseigné"}</p>
                            </div>
                        </li>
                        <li className="flex justify-between">
                            <p className="font-bold">E-mail : </p>
                            <div className="flex flex-col items-end">
                                <p>{props.dataOnePlace.getEmail().length>0 ? props.dataOnePlace.getEmail() : "non renseigné"}</p>
                            </div>
                        </li>
                    </ul>
                    {Object.keys(authentifiateUser).length>0 && props.dataOnePlace.getOwner() === authentifiateUser.getId() &&
                        <div>
                            <Button onClick={contactUpdateManager.open} size="xs">Modifier</Button>
                            <CustomModal opened={contactUpdate} onClose={contactUpdateManager.close} size="lg">
                                <form onSubmit={(e)=>{changeMsg(e)}} className="flex flex-col gap-3 items-end">
                                    <div className="w-full flex flex-col gap-3">
                                        <Input label="Adresse" placeholder="Obligatoire" name="street" value={props.dataOnePlace.getStreet()} />
                                        <Input label="Code Postale" placeholder="Obligatoire" name="codePostal" value={props.dataOnePlace.getCodePostal()} />
                                        <Input label="Ville" placeholder="Obligatoire" name="city" value={props.dataOnePlace.getCity()} />
                                        <Input label="Département" placeholder="Obligatoire" name="county" value={props.dataOnePlace.getCounty()} />
                                        <Input label="Adresse mail" placeholder="Facultatif" name="email" value={props.dataOnePlace.getEmail()} />
                                        <Input label="Numéro" placeholder="Facultatif" name="phone" value={props.dataOnePlace.getPhone()} />
                                    </div>
                                    <Button size="xs" type="submit">Valider</Button>
                                    <p className="text-red-500">{msg}</p>
                                </form>
                            </CustomModal>
                        </div>
                    }
                </div>
            }
        </div>
    )
}