import { Loader, Pagination } from "@mantine/core"
import { SelectorNavLink } from "../Components/General/SelectorNavLink"
import { ImageProfileManagement } from "../ComplexeComponents/Image/ImageProfileManagement"
import { useUserPhotoManager } from "../../Module/UserPhotoManager/UserPhotoManager.hook"

export const UserPhotoManager:React.FC = () => {

    const {tabImages, page, numberOfPage, changePage, deleteOneImage} = useUserPhotoManager()

    if(tabImages){

        return(
            <div className="flex flex-col gap-4 items-center">
                <div className="flex gap-3 w-full">
                    <div className="flex ">
                        <SelectorNavLink to="/index/user/profile" selected={true}>Mes photos</SelectorNavLink>
                        <SelectorNavLink to="/index/user/comment" selected={false}>Mes commentaires</SelectorNavLink>
                    </div>
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