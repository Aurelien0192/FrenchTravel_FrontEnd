import { imageManagementStore, ImageManagementStore } from "./ImageManagement.store"

class ImageManagementServices{

    constructor(
        private _imageManagementStore : ImageManagementStore
    ){}

    handleFileChange = (filesTabInit:Array<File>, filesUrlInit:Array<string>, e:React.ChangeEvent<HTMLInputElement>):void => {
        if(e.target.files){
            let filesTabInt: Array<File> = []
            let filesUrlInt: Array<string> = []
            for(let i=0; i<e.target.files.length;i++){
                filesTabInt.push(e.target.files[i])
                filesUrlInt.push(URL.createObjectURL(e.target.files[i]))
                filesTabInt = [...filesTabInt, ...filesTabInit]
                filesUrlInt = [...filesUrlInt, ...filesUrlInit]
            }

            this._imageManagementStore.imageTopload$().next(filesTabInt)
            this._imageManagementStore.imageToDisplayForUpload$().next(filesUrlInt)
        }
    }

    deleteImage = (filesTabInit:Array<File>, filesUrlInit:Array<string>, index:number) => {
        const filesTabInt: Array<File> = [... filesTabInit]
        const filesUrlInt: Array<string> = [... filesUrlInit]
        filesTabInt.splice(index,1)
        filesUrlInt.splice(index,1)
        console.log(index)

        this._imageManagementStore.imageTopload$().next(filesTabInt)
        this._imageManagementStore.imageToDisplayForUpload$().next(filesUrlInt)
    }
}

export const imageManagementService = new ImageManagementServices(imageManagementStore)