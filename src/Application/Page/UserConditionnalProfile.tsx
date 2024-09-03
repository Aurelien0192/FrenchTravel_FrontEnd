import { useEffect, useState } from "react"
import { useAuthentification } from "../../Module/Authentification/authentification.hook"
import { OwnerPlacesBrowser } from "./OwnerPlacesBrowser"
import { UserPhotoManager } from "./UserPhotoManager"
import { FrenchTravelAnimated } from "../Components/svg/FrenchTravelAnimated"

export const UserConditionalProfile: React.FC = () =>{
    const {authentifiateUser} = useAuthentification()
    const [isProfessional, setisProfessional] = useState<boolean>(false)

    useEffect(() => {
    if(Object.keys(authentifiateUser).length>0 && authentifiateUser.getUserType() === "professional"){
            setisProfessional(true)
        }
    },[authentifiateUser])
    if(Object.keys(authentifiateUser).length===0){
        return <FrenchTravelAnimated />
    }else{
        return isProfessional ? <OwnerPlacesBrowser /> : <UserPhotoManager />
    }
}