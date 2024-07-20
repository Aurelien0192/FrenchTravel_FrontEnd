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
import { axiosResponseServices } from "../../Module/HTTP/axiosResponse.services"
import { AxiosResponseError } from "../../Module/HTTP/axiosResponseError.dto"
import { AxiosResponseServices } from "../../Module/HTTP/axiosResponse.services"
import { FormularServices } from "../../Module/FormularGeneralServices/formularServices"

export function AddPlace() {

  const[categorie, setCategorie] = useState<string>("restaurant")
  const [msg, setMsg] = useState<string>("")
  const { filesTab } = useImageManagement()
  const {hotelCategorie} = useCategorieSelector()

  const changeCategorie = (value:string) => {
    setCategorie(value)
  }

  const  addResponseOfServer= async (responseServer:Promise<AxiosResponseError>)=>{
    const responseAxios = await responseServer
    axiosResponseServices.updateAxiosResponse(responseAxios)
    setMsg(AxiosResponseServices.responseServerPostUser(responseAxios.getStatus()))
    if(responseAxios.getStatus()=== 201){
            setTimeout(()=>{
                window.location.reload()
            },2000)
        }else{
            responseAxios!.getFieldsWithError()?.forEach((e) =>{
                FormularServices.showError(e)
            })
        }
  }

  return (
  
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
          <p>{msg}</p>
      </div>
      <div className="flex flex-col gap-6">
        <SupplementaryInfo categorie={categorie} />
        <PhotosManagement />
        <Button size="md" type="submit">Valider</Button>
      </div>
    </form>
  
  )
}

