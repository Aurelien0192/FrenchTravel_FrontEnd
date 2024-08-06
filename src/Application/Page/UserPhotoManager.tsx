import { useEffect, useState } from "react"
import { Image } from "../../Module/Image/Image.class"
import { ImageService } from "../../Module/Image/Image.service"
import { ImageDisplay } from "../ComplexeComponents/Image/ImageDisplay"
import { Loader } from "@mantine/core"

export const UserPhotoManager:React.FC = () => {

    const [tabImages, setImages] = useState<Array<Image>>()
    const [page, setPage] = useState<number>(1)
    const [numberOfPage, setTotalOfImages] = useState<number>(0)

    useEffect(()=> {
        async function getImagesFromServer(){
            const responseOfServer = await ImageService.getImagesOfUser(page)
            setImages(responseOfServer.images)
            setTotalOfImages(Math.ceil(responseOfServer.total /16))
        }
        getImagesFromServer()
    },[page])
    if(tabImages){

        return(
            <div className="grid grid-cols-4 gap-4">
                {tabImages.map((image,index) => {
                    return (
                            <div key={index}>
                                <img className="w-full h-[160px] object-cover rounded-xl" src={`http://localhost:3001/${image.getPath()}`}/>
                            </div>
                        
                    )
                })}
            </div>
        )
    }else{
        <Loader />
    }
}