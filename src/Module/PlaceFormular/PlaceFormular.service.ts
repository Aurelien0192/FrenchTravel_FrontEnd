import { FormEvent } from "react"
import { placeSubmit } from "../Place/Place.type"
import { PlaceServices } from "../Place/Place.services"

class PlaceFormularService{
    handleSubmit(e:FormEvent<HTMLFormElement>, filesTab:Array<File>, hotelCategorie: number|undefined){
    
    e.preventDefault()
    const form : HTMLFormElement = e.currentTarget
    const formData = new FormData(form)
    const data: placeSubmit = JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))
    hotelCategorie ? data.hotelCategorie=hotelCategorie : data.hotelCategorie
    PlaceServices.postNewPlace(filesTab as Array<File>,data)
  }
}

export const placeFormularService = new PlaceFormularService