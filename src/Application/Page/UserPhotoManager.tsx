import { useEffect, useState } from "react"
import { Image } from "../../Module/Image/Image.class"
import { ImageService } from "../../Module/Image/Image.service"
import { Loader, Pagination } from "@mantine/core"
import { SelectorNavLink } from "../Components/General/SelectorNavLink"
import { SearchBar } from "../Components/General/SearchBar"
import { AxiosResponse } from "axios"
import { ImageProfileManagement } from "../ComplexeComponents/Image/ImageProfileManagement"

export const UserPhotoManager:React.FC = () => {

    const [tabImages, setTabImages] = useState<Array<Image>>()
    const [page, setPage] = useState<number>(1)
    const [numberOfPage, setNumberOfPage] = useState<number>(0)

    async function getImagesFromServer(){
            const responseOfServer = await ImageService.getImagesOfUser(page)
            setTabImages(responseOfServer.images)
            setNumberOfPage(Math.ceil(responseOfServer.total /16))
        }

    useEffect(()=> {
        getImagesFromServer()
    },[page])

    function changePage(newPage:number){
        setPage(newPage)
    }

    async function deleteOneImage(id:string){
        const responseOfServer:AxiosResponse = await ImageService.deleteImage(id)
        console.log(responseOfServer)
        if(responseOfServer.status ===200 && tabImages){
            getImagesFromServer()
        }
    }


    if(tabImages){

        return(
            <div className="flex flex-col gap-4 items-center">
                <div className="flex gap-3 w-full">
                    <div className="flex ">
                        <SelectorNavLink to="/index/user/places" selected={true}>Mes photos</SelectorNavLink>
                        <SelectorNavLink to="" selected={false}>Mes commentaires</SelectorNavLink>
                    </div>
                    <SearchBar/>
                </div>
                <div className="grid grid-cols-4 w-full gap-4">
                    {tabImages.map((image,index) => {
                        return (
                            <ImageProfileManagement key={index} image={image} onClick={(e) => {e.preventDefault();deleteOneImage(image.getId())}} />

                        )
                    })}
                </div>
                <Pagination
                total={numberOfPage ? numberOfPage : 1}
                color={"#8C3616"}
                value={page}
                onChange={(value:number) => changePage(value)}
                onNextPage={() => changePage(page+1)}
                onPreviousPage={() => changePage(page-1)} />
            </div>
        )
    }else{
        <Loader />
    }
}