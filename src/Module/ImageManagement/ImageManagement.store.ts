import { BehaviorSubject } from "rxjs";

export class ImageManagementStore{
    private readonly _imageToUpload : BehaviorSubject<Array<File>>
    private readonly _imageToDisplayForUpload : BehaviorSubject<Array<string>>

    constructor(){
        this._imageToUpload = new BehaviorSubject([] as Array<File>)
        this._imageToDisplayForUpload = new BehaviorSubject([] as Array<string>)
    }

    imageTopload$ = ():BehaviorSubject<Array<File>> => {
        return this._imageToUpload
    }

    imageToDisplayForUpload$ = ():BehaviorSubject<Array<string>> => {
        return this._imageToDisplayForUpload
    }
}

export const imageManagementStore = new ImageManagementStore()