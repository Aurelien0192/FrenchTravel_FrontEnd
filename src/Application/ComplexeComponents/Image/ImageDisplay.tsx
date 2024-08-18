/* composant permettant l'affichage d'une image dans la page AddPlace
prends deux propriétés :
  - fileUrl : path de l'image importé
  - index : correspond à l'index de l'image ajouté
  
  lorsque l'utilisateur ajoute une photo, la photo va être affiché par ce composant.
  Si l'utilisateur survol l'image, le useState hidden passe à true permettant l'affichage d'une div possédant un bouton pour supprimer l'image //1
  Lorsque la souris quitte l'image, hidden repasse à false, faisant disparaitre le bouton. //2

  Lorsque l'utilisateur clique sur le bouton supprimé, la fonction deleteImage de imageManagementService est déclenchée : //3
    cette fonction prend en argument 3 arguments : 
      - l'observable filesTab (contient les images ajoutées par l'utilisateur)
      - l'observable filsUrl (contient les adresses des photos ajoutées)
      - l'index de la photo à supprimer.

    ceci à pour conséquence la suppression de la photo dans les deux observables et donc le retrait de la photo dans l'affichage.
  A*/

import { imageManagementService } from "../../../Module/ImageManagement/ImageManagement.services"
import { useImageManagement } from "../../../Module/ImageManagement/ImageManagement.hook"
import { useImage } from "../../../Module/Image/Image.hook"

type imageDisplayProps = {
    fileUrl : string
    index : number
}

export const ImageDisplay:React.FC<imageDisplayProps> = (props) => {
    
    const {hidden, handleHoverImgEnter, handleHoverImgExit} = useImage()

    const{filesUrl, filesTab} = useImageManagement()
  
    return(

            <div className="relative size-fit">
                <img className=" object-cover h-[200px] w-full" src={props.fileUrl}
                onMouseEnter={handleHoverImgEnter} //1
                onMouseLeave={handleHoverImgExit} //2
                />
                <div className={!hidden?"hidden":"bg-black bg-opacity-70 absolute top-0 w-full h-full flex justify-center items-center"}
                onMouseEnter={handleHoverImgEnter}
                onMouseLeave={handleHoverImgExit}
                >
                  <button className=" m-auto uppercase font-bold rounded-xl px-1 py-3 border-2 border-yellow-600 text-yellow-600"
                    onClick={(e) => {e.preventDefault();imageManagementService.deleteImage(filesTab as Array<File>, filesUrl,props.index)}} //3
                  >supprimer</button>
                </div>
            </div>
    )
}