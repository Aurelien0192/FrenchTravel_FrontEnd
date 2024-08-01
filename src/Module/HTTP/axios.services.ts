import { http } from "./axios.instance"
import { queryGetPlace } from "./axios.type"

export class AxiosServices{

    /* fonction permettant l'utilisation de la méthode post sur le server via axios */
    static async postInDataBase<T>(path:string, data:T){
        try{
            const response = await http.post(path,data,{validateStatus:() => true})
            return response         
        }catch(e){
            console.log(e)

        }
    }

    static async getDataFromDatabase<T>(path:string,data?:queryGetPlace){
        try{
            if(data){
                const response = await http.get<T>(path+`?latCoordinate=${data.latCoordinate}&lonCoordinate=${data.lonCoordinate}`)
                return response.data
            }
            const response = await http.get<T>(path)
            return response.data
        }catch(e){
            console.log(e)
        }
    }

    static async getUserFromDatabase<T>(path:string){
        try{
            const response = await http.get<T>(path)
            return response
        }catch(e){
            console.log(e)
        }
    }


    /* fonction permettant le post d'image via la méthode post sur le server via axios */
    static async postImages(photos:Array<File>,place_id:string){
        try{
            const formData = new FormData()                         //création d'un nouveau formData
            photos.forEach((e) => {                                 //a laquelle on y affecte sous la clé images les différentes photos
                formData.append('images',e)
            })
            formData.append('place_id',place_id)                    //ajout de l'id de la place au formData sous la clé place_id
            const response = await http.post('/images',formData)    //envoie des infos au serveur
            return response         
        }catch(e){
            throw e
            console.log(e)
        }
    }
    
    static async postImageProfil(photo:File){
        try{
            const formData = new FormData()                         //création d'un nouveau formData
            formData.append('image',photo)
            const response = await http.put('/profilePhoto/user',formData)    //envoie des infos au serveur
            return response         
        }catch(e){
            throw e
            console.log(e)
        }
    }

    /* fonction permettant de mettre à jour des informations sur le server*/
    static async updateElementOnServer<T>(path:string, data:T){
        try{
            const response = await http.put(path, data, {validateStatus:() => true})
            return response
        }catch(e){
            console.log(e)
        }
    }
}