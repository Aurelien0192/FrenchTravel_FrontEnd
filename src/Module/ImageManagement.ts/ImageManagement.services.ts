import { imageManagementStore, ImageManagementStore } from "./ImageManagement.store"

class ImageManagementServices{

    constructor(
        private _imageManagementStore : ImageManagementStore
    ){}

    handleFileChange = (filesTabInit:Array<File>, filesUrlInit:Array<string>, e:React.ChangeEvent<HTMLInputElement>) => {
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
}

export const imageManagementService = new ImageManagementServices(imageManagementStore)