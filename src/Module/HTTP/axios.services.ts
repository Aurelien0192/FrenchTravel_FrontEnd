import { http } from "./axios.instance"

export class AxiosServices{
    static async postNewPlace<T>(data){
        try{
            http.post('/image',data)         
        }
    }
}