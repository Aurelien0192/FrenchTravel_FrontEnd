import { MouseEventHandler } from "react";
import { Image } from "../../../Module/Image/Image.class";
import { useImage } from "../../../Module/Image/Image.hook";

type imageProfileManagementProps = {
    onClick: MouseEventHandler<HTMLButtonElement>
    image: Image
}



export const ImageProfileManagement: React.FC<imageProfileManagementProps> = (props) => {

    const {hidden, handleHoverImgEnter, handleHoverImgExit} = useImage()

    return(
        <div className="relative">
            <img className="w-full h-[160px] object-cover rounded-xl" src={props.image.getPath()}
                onMouseEnter={handleHoverImgEnter} //1
                onMouseLeave={handleHoverImgExit} //2
            />
            <div className={!hidden?"hidden":"bg-black rounded-xl bg-opacity-70 absolute top-0 w-full h-full flex justify-center items-center"}
                onMouseEnter={handleHoverImgEnter}
                onMouseLeave={handleHoverImgExit} 
            >
                <button className=" m-auto uppercase font-bold rounded-xl px-1 py-3 border-2 border-yellow-600 text-yellow-600"
                    onClick={props.onClick} //3
                >supprimer</button>
            </div>
        </div>
    )
}