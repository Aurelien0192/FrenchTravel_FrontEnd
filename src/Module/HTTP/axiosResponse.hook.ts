import { useEffect, useState } from "react"
import { axiosResponseStore } from "./axiosResponse.store"

export const useResponseAxios = () => {
    const[responseServer, setResponseServer] = useState<number>(0)

    useEffect(()=>{
        const responseServer = axiosResponseStore.serverResponse$().subscribe((newResponse)=>{
            setResponseServer(newResponse)
        })
        return (()=> {responseServer.unsubscribe()})
    },[])
    
    return {responseServer}
}
