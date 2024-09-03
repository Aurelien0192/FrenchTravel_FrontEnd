import { getURL } from "../HTTP/axios.instance"
import { image } from "./Image.type"

export class Image{
    private _id: string
    private name: string
    private path:string

    constructor(image: image){
        this._id = image._id
        this.name = image.name
        this.path = `http://${getURL()}:3001/`+image.path
    }

    getId(){
        return this._id
    }

    getName(){
        return this.name
    }

    getPath(){
        return this.path
    }

    static createNewImage(image:image):Image{
        const newImage:Image = new Image(image)
        return newImage
    }
}