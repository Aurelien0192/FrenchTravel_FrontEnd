import { FormEvent } from "react"
import { placeSubmit } from "../Place/Place.type"
import { PlaceServices } from "../Place/Place.services"

class PlaceFormularService{
    handleSubmit(e:FormEvent<HTMLFormElement>, filesTab:Array<File>){
    console.log("ok")
    e.preventDefault()
    const form : HTMLFormElement = e.currentTarget
    const formData = new FormData(form)
    const data: placeSubmit = JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))
    PlaceServices.postNewPlace(filesTab as Array<File>,data)
  }
}

export const placeFormularService = new PlaceFormularService