import { useState } from "react"

type imageDisplayProps = {
    fileUrl : string
}

export const ImageDisplay:React.FC<imageDisplayProps> = (props) => {
    const[hidden, setHidden] = useState<boolean>(false)

    const handleHoverImgEnter = () => {
        setHidden(true)
    }

  const handleHoverImgExit= () => {
        setHidden(false)
    }
    return(

            <div className="relative">
                <img className=" object-cover h-[200px] w-full" src={props.fileUrl}
                  onMouseEnter={handleHoverImgEnter}
                  onMouseLeave={handleHoverImgExit}
                  />
                  <div className={!hidden?"hidden":"bg-black bg-opacity-70 absolute top-0 w-full h-full flex justify-center items-center"}
                  onMouseEnter={handleHoverImgEnter}
                  onMouseLeave={handleHoverImgExit}
                  >
                    <button className=" m-auto uppercase font-bold rounded-xl px-1 py-3 border-2 border-yellow-600 text-yellow-600" >supprimer</button>
                  </div>
            </div>
    )
}