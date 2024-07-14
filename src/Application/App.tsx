
import React, { FormEvent, MutableRefObject, useRef, useState } from "react"
import { ImageDisplay } from "./ImageDisplay"
export function App() {

  // const [file, setFile] = useState<FileList>()
  const[fileTab, setFileTab] = useState<Array<File|null>>([null])
  const[fileUrl, setFileUrl] = useState<Array<string>>([])
  const hiddenFileInput = useRef<HTMLInputElement>()

  const handleClick = (e:React.MouseEvent) => {
      e.preventDefault()
      hiddenFileInput.current!.click() 
  }

  const handleFileCHange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      console.log(e.target)
      const filesTabInt: Array<File> = []
      const filesUrlInt: Array<string> = []
      for(let i=0; i<e.target.files.length;i++){
        filesTabInt.push(e.target.files[i])
        filesUrlInt.push(URL.createObjectURL(e.target.files[i]))
      }
      setFileTab([...fileTab, ...filesTabInt])
      setFileUrl([...fileUrl, ...filesUrlInt])
    }
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form : HTMLFormElement = e.currentTarget
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    console.log(formJson.images)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-60 justify-between px-14">
        <div className="flex flex-col gap-6">
          <label className="flex justify-between items-center">
            Nom du lieu
            <input type="text"
            name="namePlace"
            className="w-9/12 h-[26px] rounded-md shadow" 
            placeholder="Les Capucines"></input>
          </label>
          <label className="flex justify-between items-center">
            Categorie
            <select name="categorie" className="w-9/12 h-[26px] rounded-md shadow">
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hôtel</option>
              <option value="activity">Activité</option>
            </select>
          </label>
          <label className="flex justify-between items-center">
            Sous-categorie
            <div className="flex gap-5 w-9/12">
              <input type="text" name="ss_cat_1"
              className="w-full h-[26px] rounded-md shadow" 
              placeholder="Française"></input>
              <input type="text" name="ss_cat_2"
              className="w-full h-[26px] rounded-md shadow" 
              placeholder="Française"></input>
            </div>
          </label>
            <label className="flex justify-between items-center">
              Adresse
              <input type="text"
              name="street"
              className="w-9/12 h-[26px] rounded-md shadow" 
              placeholder="32 rue des coquelicots"></input>
            </label>
            <label className="flex justify-between items-center">
              Code Postal
              <input type="text"
              name="postalCode"
              className="w-9/12 h-[26px] rounded-md shadow" 
              placeholder="32 rue des coquelicots"></input>
            </label>
            <label className="flex justify-between items-center">
              Ville
              <input type="text"
              name="city"
              className="w-9/12 h-[26px] rounded-md shadow" 
              placeholder="Paris"></input>
            </label>
            <label className="flex justify-between items-center">
              Département
              <input type="text"
              name="county"
              className="w-9/12 h-[26px] rounded-md shadow" 
              placeholder="Ile de France"></input>
            </label>
            <label className="flex justify-between items-center">
              Adresse mail
              <input type="text"
              name="mail"
              className="w-9/12 h-[26px] rounded-md shadow" 
              placeholder="standard@capucine.fr"></input>
            </label>
            <label className="flex justify-between items-center">
              Numéro
              <input type="text"
              name="phone"
              className="w-9/12 h-[26px] rounded-md shadow" 
              placeholder="01.01.01.01.01"></input>
            </label>
            <label className="flex justify-between items-top">
              Description
              <textarea
              name="description"
              className="w-9/12 h-[295px] rounded-md shadow align-bottom" 
              placeholder="Notre restaurant vous acceuille du ..."></textarea>
            </label>
        </div>
        <div className="flex flex-col gap-6">
          <p>Infos supplémentaires</p>
          <label className="flex justify-between items-center">
            Fourchette de prix
            <input
            type="text"
            name="price"
            className="w-9/12 h-[26px] rounded-md shadow align-bottom" 
            placeholder="15€ - 25€"></input>
          </label>
          <label className="flex justify-between items-center">
            Cuisine
            <input
            type="text"
            name="cook"
            className="w-9/12 h-[26px] rounded-md shadow align-bottom" 
            placeholder="15€ - 25€"></input>
          </label>
          <label className="flex justify-between items-center">
            Services
            <textarea
            name="services"
            className="w-9/12 h-[180px] rounded-md shadow align-bottom" 
            placeholder="Réservations, places assises, chaise haute..."></textarea>
          </label>
            <button onClick={handleClick}>ajouter photo</button>
            <input name="images" className="hidden" multiple type="file" ref={hiddenFileInput as MutableRefObject<HTMLInputElement>} onChange={handleFileCHange}></input>
            <div className=" h-[400px] grid grid-cols-3 gap-2 overflow-y-scroll">
                {fileUrl?.map((e,index)=>{return(
                  <ImageDisplay key={index} fileUrl={e} />
                )})}

            </div>
        </div>
        <button type="submit" onClick={(e) => {e.preventDefault;console.log(e)}}>Valider</button>
      </form>
    </div>
  )
}

export default App
