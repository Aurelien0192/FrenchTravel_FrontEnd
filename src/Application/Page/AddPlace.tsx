/* page pour formulaire de création d'un nouveau lieu.
  Lors du choix d'une catégorie (activité, hôtel, restaurant), la cétagorie va être stocké dans le hook useState
  categorie. Ce hook va être utilisé pour l'affichage des infos supplémentaires.
  Ensuite nous avons aussi l'observable filesTab(contient les photos d'un lieu) qui va être alimenté par le composant PhotosManagement
  et envoyé au server lors de la soumission du formulaire.

  A la soumission du formulaire, on appelle par le biais de la fonction changeMsg la fontion addResponseServer de la class FormularServices.
  On passe à la fonction la fonction handleSubmit (rôle est de faire la demande serveur d'ajout d'un nouveau lieu et de retourner la réponse.)
  addResponseServer de la class FormularServices à pour rôle de traiter le retour de l'information et de fournir un message à afficher en fonction de la réponse
  du serveur.

*/

import { useState } from "react"
import { Input } from "../Components/General/Input"
import { SelectInput } from "../Components/General/SelectInput"
import { DoubleInput } from "../Components/General/DoubleInput"
import { TextArea } from "../Components/General/TextArea"
import { SupplementaryInfo } from "../ComplexeComponents/Places/SupplementaryInfo"
import { PhotosManagement } from "../ComplexeComponents/Image/PhotosManagement"
import { useImageManagement } from "../../Module/ImageManagement/ImageManagement.hook"
import { useSelector } from "../../Module/HotelCategorieOrNotationSelector/HotelCategorieSelectorOrNotation.hook"
import { placeFormularService } from "../../Module/PlaceFormular/PlaceFormular.service"
import { Button } from "../Components/General/Button"
import { FormularServices } from "../../Module/FormularGeneralServices/formularServices"
import { useResponseAxios } from "../../Module/HTTP/axiosResponse.hook"

export function AddPlace() {

  const[categorie, setCategorie] = useState<string>("restaurant")
  const [msg, setMsg] = useState<string>("")
  const { filesTab } = useImageManagement()
  const {selectedNoteOrHotelCategorie} = useSelector()
  const { responseServer } = useResponseAxios()

  const changeCategorie = (value:string) => {
    setCategorie(value)
  }

  const changeMsg = async (e:React.FormEvent<HTMLFormElement>) => {
    const newMsg = await FormularServices.addResponseOfServer(placeFormularService.handleSubmit(e,filesTab as Array<File>,selectedNoteOrHotelCategorie),"place")
    setMsg(newMsg)
  }
  
  return (
  
    <form onSubmit={(e) => {changeMsg(e)}} 
      className="flex flex-col mb-5 md:grid lg:grid-cols-2 gap-6 lg:gap-60 justify-between w-full">
      
      <div className="flex flex-col gap-6">
        <Input placeholder="Les capucines" name="name" label="Nom du lieu*"/>
        <SelectInput 
        label="Catégorie" 
        name="categorie"
        onChange={changeCategorie} 
        options={
          [{
            name: "Restaurant",
            value: "restaurant"
          },
          {
            name: "Hôtel",
            value: "hotel"
          },{
            name: "Activité",
            value: "activity"
          }]} />
          <DoubleInput label="Sous-catégorie" name={["underCategorie1","underCategorie2"]} placeholder={["Française","Traditionnel"]} />
          <Input placeholder="32 rue des Coquelicots" name="street" label="Adresse*" />
          <Input placeholder="75000" name="codePostal" label="Code Postal*" />
          <Input placeholder="Paris" name="city" label="Ville*" />
          <Input placeholder="Ile-de-France" name="county" label="Département*" />
          <Input placeholder="standard@capucine.fr" name="email" label="Adresse mail"/>
          <Input placeholder="01.01.01.01.01" name="phone" label="Numéro" />
          <TextArea placeholder="Notre restaurant vous acceuille du ..." label="Description*" name="describe" size="xl" />
          <p className={`w-full  text-center ${responseServer?.getStatus && responseServer?.getStatus()===201?'text-green-500':'text-red-500'}`}>{msg}</p>
      </div>
      <div className="flex flex-col gap-6">
        <SupplementaryInfo categorie={categorie} />
        <PhotosManagement />
        <Button size="md" type="submit">Valider</Button>
      </div>
    </form>
  
  )
}

