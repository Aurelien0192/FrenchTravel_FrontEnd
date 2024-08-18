import { AxiosServices } from "../HTTP/axios.services";
import { Image } from "./Image.class";
import { responseGetManyImages } from "../HTTP/axiosResponseError.type";
import { AxiosResponse } from "axios";

export class ImageService{
    static async getImagesOfUser(page:number){
        const response: responseGetManyImages = await AxiosServices.getDataFromDatabase(`/images?page=${page}&limit=16`) as responseGetManyImages
        const images:Array<Image> =[]
        const total:number = response.count
        response.results.forEach((image) => {
            images.push(Image.createNewImage(image))
        })
        return {images, total}
    }

    static async deleteImage(id:string){
        const response:AxiosResponse = await AxiosServices.deleteElementOnServer(`/image/${id}`) as AxiosResponse
        return response
    }
}