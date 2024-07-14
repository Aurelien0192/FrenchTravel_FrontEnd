import { ImageDisplay } from "./ImageDisplay"
import { MutableRefObject, useRef } from "react"
type photosManaging = {
    filesUrl: Array<string>
    addFile: Function
    deleteFile: Function

}

export const PhotosManaging:React.FC<photosManaging> = (props) => {

    const hiddenFileInput = useRef<HTMLInputElement>()

    const handleClick = (e:React.MouseEvent) => {
      e.preventDefault()
      hiddenFileInput.current!.click() 
  }

    return(
        <div>
            <button onClick={handleClick}>ajouter photo</button>
            <input name="images" className="hidden" multiple type="file" ref={hiddenFileInput as MutableRefObject<HTMLInputElement>} onChange={(e) =>props.addFile(e)}></input>
            <div className=" h-[400px] grid grid-cols-3 gap-2 overflow-y-scroll">
                {props.filesUrl?.map((e,index)=>{return(
                  <ImageDisplay key={index} fileUrl={e} deleteFiles={props.deleteFile}/>
                )})}
            </div>
        </div>
    )
}