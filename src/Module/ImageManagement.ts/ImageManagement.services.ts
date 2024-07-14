import { imageManagementStore, ImageManagementStore } from "./ImageManagement.store"

class ImageManagementServices{

    

    constructor(
        private _imageManagementStore : ImageManagementStore
    ){}

    handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const filesTabInt: Array<File> = []
      const filesUrlInt: Array<string> = []
      for(let i=0; i<e.target.files.length;i++){
        filesTabInt.push(e.target.files[i])
        filesUrlInt.push(URL.createObjectURL(e.target.files[i]))
      }

      this._imageManagementStore.imageTopload$().next(filesTabInt)
      this._imageManagementStore.imageToDisplayForUpload$().next(filesUrlInt)
    }
  }
}

export const imageManagementService = new ImageManagementServices(imageManagementStore)