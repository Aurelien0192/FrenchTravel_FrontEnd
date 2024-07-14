import { useEffect, useState } from "react"
import { imageManagementStore } from "./ImageManagement.store"

export const useImageManagement = () =>{
    const[filesTab, setFilesTab] = useState<Array<File|null>>([null])
    const[filesUrl, setFilesUrl] = useState<Array<string>>([])

    useEffect(()=>{
        const imageToUpload = imageManagementStore.imageTopload$().subscribe((newFilesTab) => {
            setFilesTab([...newFilesTab])
        })
        
        const imageDisplayForUpload = imageManagementStore.imageToDisplayForUpload$().subscribe((newTabDisplay) => {
            setFilesUrl([...newTabDisplay])
        })

        return(() => {imageToUpload.unsubscribe(); imageDisplayForUpload.unsubscribe()})
    },[])

    return {filesTab, filesUrl}
}