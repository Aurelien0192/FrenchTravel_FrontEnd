import { useState } from "react"
import { Input } from "./..//Components/Input"
import { SelectInput } from "./..//Components/SelectInput"
import { DoubleInput } from "./..//Components/DoubleInput"
import { TextArea } from "../Components/TextArea"
import { SupplementaryInfo } from "./../ComplexeComponents/SupplementaryInfo"
import { PhotosManagement } from "./../ComplexeComponents/PhotosManagement"
import { useImageManagement } from "../../Module/ImageManagement.ts/ImageManagement.hook"
import { useCategorieSelector } from "../../Module/HotelCategorieSelector/HotelCategorieSelector.hook"
import { placeFormularService } from "../../Module/PlaceFormular/PlaceFormular.service"
import { Button } from "../Components/Button"
import { Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { OverlayConfirmationPost } from "../ComplexeComponents/OverlayConfirmationPost"

export function AddPlace() {

  const[categorie, setCategorie] = useState<string>("restaurant")
  const[responseServer, setResponseServer] = useState<number>(0)
  const [opened,{ open, close }] = useDisclosure(false)
  const { filesTab } = useImageManagement()
  const {hotelCategorie} = useCategorieSelector()

  const changeCategorie = (value:string) => {
    setCategorie(value)
  }

  const  addResponseOfServer= async (statusCode:Promise<number>|number)=>{
    const statusCodeTab = await statusCode
    setResponseServer(statusCodeTab)
  }

  const modal = () => {
    close
  }

  return (
    <div>
      <form onSubmit={(e) => {addResponseOfServer(placeFormularService.handleSubmit(e,filesTab as Array<File>,hotelCategorie))}} 
        className="grid grid-cols-2 gap-60 justify-between px-14">
        
        <div className="flex flex-col gap-6">
          <Input placeholder="Les capucines" name="name" label="Nom du lieu"/>
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
            <Input placeholder="32 rue des Coquelicots" name="street" label="Adresse" />
            <Input placeholder="75000" name="codePostal" label="Code Postal" />
            <Input placeholder="Paris" name="city" label="Ville" />
            <Input placeholder="Ile-de-France" name="county" label="Département" />
            <Input placeholder="standard@capucine.fr" name="email" label="Adresse mail"/>
            <Input placeholder="01.01.01.01.01" name="phone" label="Numéro" />
            <TextArea placeholder="Notre restaurant vous acceuille du ..." label="Description" name="describe" size="xl" />
        </div>
        <div className="flex flex-col gap-6">
          <SupplementaryInfo categorie={categorie} />
          <PhotosManagement />
          <Button onClick={open} size="md" type="submit">Valider</Button>
          <button onClick={open}></button>
        </div>
      </form>
      <Modal
        opened={opened}
        onClose={close}
        title="Ajout d'un lieu"
        centered
        overlayProps={{
          backgroundOpacity:0.30,
          color:'#D98D30',
          blur:3,
        }}
      >
        <OverlayConfirmationPost close={modal} statusCode={responseServer} statusCodeRes={addResponseOfServer} />
      </Modal>
    </div>
  )
}

