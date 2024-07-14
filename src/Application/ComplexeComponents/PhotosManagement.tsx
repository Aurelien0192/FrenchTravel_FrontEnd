import { useImageManagement } from "../../Module/ImageManagement.ts/ImageManagement.hook"
import { imageManagementService } from "../../Module/ImageManagement.ts/ImageManagement.services"
import { ImageDisplay } from "./ImageDisplay"
import { MutableRefObject, useRef } from "react"

export const PhotosManagement:React.FC = () => {

    const hiddenFileInput = useRef<HTMLInputElement>()
    const { filesUrl,filesTab } = useImageManagement()
    const handleClick = (e:React.MouseEvent) => {
      e.preventDefault()
      hiddenFileInput.current!.click() 
  }

    return(
        <div>
            <button onClick={handleClick}>ajouter photo</button>
            <input name="images" className="hidden" multiple type="file"
                ref={hiddenFileInput as MutableRefObject<HTMLInputElement>} 
                onChange={(e) =>{imageManagementService.handleFileChange(filesTab as Array<File>, filesUrl, e)}}/>
            <div className=" h-[400px] grid grid-cols-3 gap-2 overflow-y-scroll">
                {filesUrl.map((e,index)=>{return(
                  <ImageDisplay key={index} index={index} fileUrl={e}/>
                )})}
            </div>
        </div>
    )
}