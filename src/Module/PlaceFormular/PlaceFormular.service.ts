import { FormEvent } from "react"
import { placeSubmit } from "../Place/Place.type"
import { PlaceServices } from "../Place/Place.services"
import { AxiosResponse } from "axios"
import { AxiosResponseError } from "../HTTP/axiosResponseError.dto"

class PlaceFormularService{
    async handleSubmit(e:FormEvent<HTMLFormElement>, filesTab:Array<File>, hotelCategorie: number|undefined){
    
    e.preventDefault()

    const form : HTMLFormElement = e.currentTarget
    const formData = new FormData(form)
    const data: placeSubmit = JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))
    hotelCategorie ? data.hotelCategorie=hotelCategorie : data.hotelCategorie
    const responseServer:AxiosResponse = await PlaceServices.postNewPlace(filesTab as Array<File>,data) as AxiosResponse
    if(responseServer.status !==201){
      return AxiosResponseError.createNewResponseError(responseServer.data, responseServer.status)
    }else{
      return AxiosResponseError.createNewResponseError(undefined, responseServer.status)
    }
  }
}

export const placeFormularService = new PlaceFormularService