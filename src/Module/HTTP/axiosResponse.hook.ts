import { useEffect, useState } from "react"
import { axiosResponseStore } from "./axiosResponse.store"
import { AxiosResponseError } from "./axiosResponseError.dto"

/* custom hook permettant de récupérer la réponse du serveur. observable */
export const useResponseAxios = () => {
    const[responseServer, setResponseServer] = useState<AxiosResponseError>()

    useEffect(()=>{
        const responseServer = axiosResponseStore.serverResponse$().subscribe((newResponse)=>{
            setResponseServer(newResponse)
        })
        return (()=> {responseServer.unsubscribe()})
    },[])
    
    return {responseServer}
}
