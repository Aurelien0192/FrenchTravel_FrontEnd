/* Composant permettant le management des photos (ajout et affichage) dans la page AddPlace 
Ce composant est composé d'un bouton, d'un input type file et d'un cadre recceuillant l'affichage des photos sélectionnées.
Le clique sur le bouton va provoquer le click sur input (qui est hidden) via le hook useRef hiddenFileInput.

ceci va permettre l'ouverture d'un overlay permettant l'insertion de photos par l'utilisateur. Les photos sélectionnées vont être stocké par l'input.
Lorsque l'input change (à l'ajout d'une ou plusieurs photos), les observables filesUrl et filesTab sont mis à jour. Ces observables gardent en mémoire les
photos sélectionnées et leur adresses, permettant, pour filesTab leurs envoient au serveur et pour filesUrl l'affichage dans le cadre.

pour chaque addresse d'image stocké dans l'affichage un composant ImageDisplay est généré en lui fournissant l'adresse de l'image à afficher et son index.
*/

import { useImageManagement } from "../../../Module/ImageManagement.ts/ImageManagement.hook"
import { imageManagementService } from "../../../Module/ImageManagement.ts/ImageManagement.services"
import { Button } from "../../Components/General/Button"
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
        <div className="flex flex-col gap-3 items-end ">
            <Button onClick={handleClick} size="xs">ajouter photos</Button> 
            <input name="images" className="hidden" multiple type="file"
                ref={hiddenFileInput as MutableRefObject<HTMLInputElement>} 
                onChange={(e) =>{imageManagementService.handleFileChange(filesTab as Array<File>, filesUrl, e)}}/>
            <div className="bg-sand border rounded border-orange w-full h-[400px] grid grid-cols-3 gap-2 overflow-y-scroll">
                {filesUrl.map((e,index)=>{return(
                    <ImageDisplay key={index} index={index} fileUrl={e}/>
                )})}
            </div>
        </div>
    )
}