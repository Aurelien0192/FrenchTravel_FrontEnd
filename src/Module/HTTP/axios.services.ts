import { http } from "./axios.instance"
import { PlaceToSubmit } from "../Place/Place.class"
export class AxiosServices{
    static async postNewPlace(data:PlaceToSubmit){
        try{
            const response = await http.post('/place',data,{validateStatus:() => true})
            return response         
        }catch(e){
            console.log(e)

        }
    }

    static async postImages(photos:Array<File>,place_id:string){
        try{
            const formData = new FormData()
            photos.forEach((e) => {
                formData.append('images',e)
            })
            formData.append('place_id',place_id)
            const response = await http.post('/images',formData)
            return response         
        }catch(e){
            console.log(e)
        }
    }
}