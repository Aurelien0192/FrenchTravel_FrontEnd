import { useState } from "react"
import { Place } from "../../../Module/Place/Place.class"
import { Button } from "../General/Button"
import { TypePlaceLabel } from "./TypePlaceLabel"
import { useClickOutside } from "@mantine/hooks"

type headerPlacePage = {
    dataOnePlace: Place
}


export const HeaderPlacePage:React.FC<headerPlacePage> = (props) => {

    const [hiddenContact, setHiddenContact] = useState<boolean>(true)
    const ref = useClickOutside(() => setHiddenContact(true))
    return(
        <div className="flex relative justify-between">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{props.dataOnePlace.getName()}</h1>
                <p>{`${props.dataOnePlace.getCountry()} > ${props.dataOnePlace.getCounty()} > ${props.dataOnePlace.getCity()}`}</p>
                <Button onClick={() => setHiddenContact(false)} size="xs">contact</Button>
            </div>
            <div className="flex gap-3">
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
                <div className="absolute top-24 left-3 bg-white rounded-xl shadow-xl p-3" ref={ref}>
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
                </div>
            }
        </div>
    )
}