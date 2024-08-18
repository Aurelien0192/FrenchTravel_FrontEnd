import { useEffect, useState } from "react"
import { Image } from "../Image/Image.class"
import { AxiosResponse } from "axios"
import { ImageService } from "../Image/Image.service"

export const useUserPhotoManager = () => {
    const [tabImages, setTabImages] = useState<Array<Image>>()
    const [page, setPage] = useState<number>(1)
    const [numberOfPage, setNumberOfPage] = useState<number>(0)

    useEffect(()=> {
        getImagesFromServer()
    },[page])

    function changePage(newPage:number){
        setPage(newPage)
    }

    async function deleteOneImage(id:string){
        const responseOfServer:AxiosResponse = await ImageService.deleteImage(id)
        if(responseOfServer.status ===200 && tabImages){
            getImagesFromServer()
        }
    }
    async function getImagesFromServer(){
        const responseOfServer = await ImageService.getImagesOfUser(page)
        setTabImages(responseOfServer.images)
        setNumberOfPage(Math.ceil(responseOfServer.total /16))
    }

    return {tabImages, page, numberOfPage, changePage, deleteOneImage}
}