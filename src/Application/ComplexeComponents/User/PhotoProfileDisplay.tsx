import { MutableRefObject, useRef, useState } from "react"
import { useAuthentification } from "../../../Module/Authentification/authentification.hook"
import { Button } from "../../Components/General/Button"
import { ProfilService } from "../../../Module/Profil/Profil.service"
import { FrenchTravelAnimated } from "../../Components/svg/FrenchTravelAnimated"

export const PhotoProfileDisplay:React.FC = () => {

    const {authentifiateUser} = useAuthentification()
    const [hidden, setHidden] = useState<boolean>(false)
    const hiddenFileInput = useRef<HTMLInputElement>()

    const handleHoverImgEnter = () => {
        setHidden(true)
    }

    const handleHoverImgExit= () => {
        setHidden(false)
    }

    const handleClick = (e:React.MouseEvent) => {
      e.preventDefault()
      hiddenFileInput.current!.click() 
  }

    return(
        <div className=" relative size-36 md:size-44 rounded-full">
            {
                Object.keys(authentifiateUser).length !==0 ? <img className=" rounded-full size-full object-cover" src={authentifiateUser.getProfilePhoto()}
                onMouseEnter={handleHoverImgEnter}
                onMouseLeave={handleHoverImgExit} /> : <FrenchTravelAnimated />
            }
            <div className={!hidden?"hidden":"bg-black bg-opacity-70 absolute top-0 w-full h-full flex justify-center items-center rounded-full"}
            onMouseEnter={handleHoverImgEnter}
            onMouseLeave={handleHoverImgExit}
            >
                <Button onClick={handleClick} variant="transparent">Modifier</Button>
                    <input name="images" className="hidden" type="file"
                        ref={hiddenFileInput as MutableRefObject<HTMLInputElement>} 
                        onChange={(e) => { e.target.files?.length===1 && ProfilService.changeProfilPhotos(e.target.files[0])}}/>
            </div>
        </div>
    )
}