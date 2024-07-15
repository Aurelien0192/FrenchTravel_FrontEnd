import { http } from "./axios.instance"
import { PlaceToSubmit } from "../Place/Place.class"
export class AxiosServices{
    static async postNewPlace(data:PlaceToSubmit){
        try{
            http.post('/place',data)         
        }catch(e){
            console.log(e)

        }
    }

    static async postImages(photos:Array<string>){
        try{
            const formData = new FormData()
            photos.forEach((e) => {
                formData.append('images',e)
            })
            await http.post('/images',formData)         
        }catch(e){
            console.log(e)
        }
    }
}