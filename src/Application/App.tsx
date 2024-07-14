
import React, { FormEvent, useState } from "react"
import { Input } from "./Components/Input"
import { SelectInput } from "./Components/SelectInput"
import { DoubleInput } from "./Components/DoubleInput"
import { TextArea } from "./Components/TextArea"
import { SupplementaryInfo } from "./ComplexeComponents/SupplementaryInfo"
import { PhotosManaging } from "./ComplexeComponents/PhotosManagement"
export function App() {

  // const [file, setFile] = useState<FileList>()
  const[filesTab, setFilesTab] = useState<Array<File|null>>([null])
  const[filesUrl, setFilesUrl] = useState<Array<string>>([])
  const[categorie, setCategorie] = useState<string>("restaurant")

  const changeCategorie = (value:string) => {
    setCategorie(value)
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const filesTabInt: Array<File> = []
      const filesUrlInt: Array<string> = []
      for(let i=0; i<e.target.files.length;i++){
        filesTabInt.push(e.target.files[i])
        filesUrlInt.push(URL.createObjectURL(e.target.files[i]))
      }
      setFilesTab([...filesTab, ...filesTabInt])
      setFilesUrl([...filesUrl, ...filesUrlInt])
    }
  }

  const deleteImage = (name:string) => {
    const filesTabCopy:Array<File|null> = [...filesTab]
    const fileUrlCopy:Array<string> = [...filesUrl]
    const indexToDelete = filesTabCopy.findIndex((file) => file!.name === name)
    filesTabCopy.splice(indexToDelete,1)
    fileUrlCopy.splice(indexToDelete,1)
    setFilesTab(filesTabCopy)
    setFilesUrl(fileUrlCopy)
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form : HTMLFormElement = e.currentTarget
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    console.log(filesTab)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-60 justify-between px-14">
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
            <Input placeholder="75000" name="postalCode" label="Code Postal" />
            <Input placeholder="Paris" name="city" label="Ville" />
            <Input placeholder="Ile-de-France" name="county" label="Département" />
            <Input placeholder="standard@capucine.fr" name="email" label="Adresse mail"/>
            <Input placeholder="01.01.01.01.01" name="phone" label="Numéro" />
            <TextArea placeholder="Notre restaurant vous acceuille du ..." label="Description" name="describe" size="xl" />
        </div>
        <div className="flex flex-col gap-6">
          <SupplementaryInfo categorie={categorie} />
          <PhotosManaging filesUrl={filesUrl} addFile={handleFileChange} deleteFile={deleteImage} />
        </div>
        <button type="submit" onClick={(e) => {e.preventDefault;console.log(e)}}>Valider</button>
      </form>
    </div>
  )
}

export default App
