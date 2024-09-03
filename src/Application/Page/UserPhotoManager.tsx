import { Pagination } from "@mantine/core"
import { SelectorNavLink } from "../Components/General/SelectorNavLink"
import { ImageProfileManagement } from "../ComplexeComponents/Image/ImageProfileManagement"
import { useUserPhotoManager } from "../../Module/UserPhotoManager/UserPhotoManager.hook"
import { FrenchTravelAnimated } from "../Components/svg/FrenchTravelAnimated"

export const UserPhotoManager:React.FC = () => {

    const {tabImages, page, numberOfPage, changePage, deleteOneImage} = useUserPhotoManager()

    if(tabImages){

        return(
            <div className="flex flex-col gap-4 items-center">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="flex flex-col md:flex-row">
                        <SelectorNavLink to="/index/user/profile" selected={true}>Mes photos</SelectorNavLink>
                        <SelectorNavLink to="/index/user/comment" selected={false}>Mes commentaires</SelectorNavLink>
                    </div>
                </div>
                <div className={`${tabImages.length>0?"grid grid-cols-2 md:grid-cols-4":"flex flex-col"} w-full gap-4`}>
                    { tabImages.length>0 ?tabImages.map((image,index) => {
                        return (
                            <ImageProfileManagement key={index} image={image} onClick={(e) => {e.preventDefault();deleteOneImage(image.getId())}} />
                        )
                    }):
                        <div>
                            <p className="font-bold text-center w-full">Vous n'avez pas encore posté de photos</p>
                        </div>
                    }
                </div>
                <Pagination
                total={numberOfPage ? numberOfPage : 1}
                color={"#8C3616"}
                value={page}
                hidden={tabImages.length===0}
                onChange={(value:number) => changePage(value)}
                onNextPage={() => changePage(page+1)}
                onPreviousPage={() => changePage(page-1)} />
            </div>
        )
    }else{
        return(<FrenchTravelAnimated />)
    }
}