import { AxiosResponse } from "axios";
import { AxiosServices } from "../HTTP/axios.services";
import { folder, folderToSubmit, responseServerGetManyFolders } from "./Folder.type";

export class FolderService{
    static async getFolderFromServer(){
        const foldersFromServer: responseServerGetManyFolders = await AxiosServices.getDataFromDatabase('/folders') as responseServerGetManyFolders
        return foldersFromServer
    }

    static async createNewFolder(name: folderToSubmit){
        const foldersCreate: AxiosResponse<folder> = await AxiosServices.postInDataBase('/folder',name) as AxiosResponse
        return foldersCreate
    }
}