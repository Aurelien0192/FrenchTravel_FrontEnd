import { FormEvent } from "react"
import { AxiosResponse } from "axios"
import { AxiosResponseError } from "../HTTP/axiosResponseError.dto"
import { PlaceServices } from "../Place/Place.services"

export class UpdateFormularPlaceService{
    static async handleSubmit(e: FormEvent<HTMLFormElement>, hotelCategorie: number|undefined, place_id: string){
    
    e.preventDefault()

    const form : HTMLFormElement = e.currentTarget
    const formData = new FormData(form)
    let data = JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))

    if(data.cook && data.services && data.price1 && data.price2){
      data.moreInfo = {
        cook: data.cook,
        services: data.services,
        price: [data.price1, data.price2]
      } 
    }
    if(data.equipment && data.services && data.accessibility){
      console.log("ok")
      data.moreInfo = {
        equipment: data.equipment,
        services: data.services,
        accessibility: data.accessibility,
        hotelCategorie: hotelCategorie
      } 
    }
    console.log(data)

    if(data.duration){
      data.moreInfo = {
        schedules:[{
            day:"monday",
            open:data.mondayOpen,
            close:data.mondayClose
        },{
            day:"tuesday",
            open:data.tuesdayOpen,
            close:data.tuesdayClose
        },{
            day:"wednesday",
            open:data.wednesdayOpen,
            close:data.wednesdayClose
        },{
            day:"thursday",
            open:data.thursdayOpen,
            close:data.thursdayClose
        },{
            day:"friday",
            open:data.fridayOpen,
            close:data.fridayClose
        },{
            day:"saturday",
            open:data.saturdayOpen,
            close:data.saturdayClose
        },{
            day:"sunday",
            open:data.sundayOpen,
            close:data.sundayClose
        }],
        duration: data.duration,
      }
    }

    if(data.underCategorie1){
      data.typeOfPlace = [data.underCategorie1,data.underCategorie2]
    }
    
    const responseServer:AxiosResponse = await PlaceServices.updateOnePlace(data, place_id) as AxiosResponse
    if(responseServer.status !==200){
      return AxiosResponseError.createNewResponseError(responseServer.data, responseServer.status)
    }else{
      return AxiosResponseError.createNewResponseError(undefined, responseServer.status)
    }
  }
}