import { useEffect, useState } from "react"
import { useAuthentification } from "../../Module/Authentification/authentification.hook"
import { Loader } from "@mantine/core"
import { OwnerPlacesBrowser } from "./OwnerPlacesBrowser"
import { UserPhotoManager } from "./UserPhotoManager"

export const UserConditionalProfile: React.FC = () =>{
    const {authentifiateUser} = useAuthentification()
    const [isProfessional, setisProfessional] = useState<boolean>(false)

    useEffect(() => {
    if(Object.keys(authentifiateUser).length>0 && authentifiateUser.getUserType() === "professional"){
            setisProfessional(true)
        }
    },[authentifiateUser])
    console.log(isProfessional)
    if(Object.keys(authentifiateUser).length===0){
        return <Loader />
    }else{
        return isProfessional ? <OwnerPlacesBrowser /> : <UserPhotoManager />
    }
}