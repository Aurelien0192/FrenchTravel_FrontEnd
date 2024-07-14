import { useState } from "react"
import { imageManagementService } from "../../Module/ImageManagement.ts/ImageManagement.services"
import { useImageManagement } from "../../Module/ImageManagement.ts/ImageManagement.hook"

type imageDisplayProps = {
    fileUrl : string
    index : number
}

export const ImageDisplay:React.FC<imageDisplayProps> = (props) => {
    const[hidden, setHidden] = useState<boolean>(false)
    const{filesUrl, filesTab} = useImageManagement()
    const handleHoverImgEnter = () => {
        setHidden(true)
    }

  const handleHoverImgExit= () => {
        setHidden(false)
    }
    return(

            <div className="relative size-fit">
                <img className=" object-cover h-[200px] w-full" src={props.fileUrl}
                onMouseEnter={handleHoverImgEnter}
                onMouseLeave={handleHoverImgExit}
                />
                <div className={!hidden?"hidden":"bg-black bg-opacity-70 absolute top-0 w-full h-full flex justify-center items-center"}
                onMouseEnter={handleHoverImgEnter}
                onMouseLeave={handleHoverImgExit}
                >
                  <button className=" m-auto uppercase font-bold rounded-xl px-1 py-3 border-2 border-yellow-600 text-yellow-600"
                    onClick={() => {imageManagementService.deleteImage(filesTab as Array<File>, filesUrl,props.index)}} 
                  >supprimer</button>
                </div>
            </div>
    )
}