import { useState, useEffect } from "react"
import { authentificationStore } from "./Authentification.store"
import { AuthentifiateUser } from "./Authentification.class"

export const useAuthentification = () => {

    const [authentifiateUser, setAuthentifiateUser] = useState<AuthentifiateUser>({}as AuthentifiateUser)

    useEffect(()=>{
        const authentifiateUser = authentificationStore.authentifiateUser$().subscribe((newAuthentifiateUser)=>{
            setAuthentifiateUser(newAuthentifiateUser)
        })
        return (()=> {authentifiateUser.unsubscribe()})
    },[])
    return { authentifiateUser }   
}