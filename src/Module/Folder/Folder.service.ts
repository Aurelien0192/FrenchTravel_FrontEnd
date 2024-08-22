import { AxiosResponse } from "axios";
import { AxiosServices } from "../HTTP/axios.services";
import { folder, folderToSubmit, responseServerGetManyFolders } from "./Folder.type";

export class FolderService{
    static async getFoldersFromServer(){
        const foldersFromServer: responseServerGetManyFolders = await AxiosServices.getDataFromDatabase('/folders') as responseServerGetManyFolders
        return foldersFromServer
    }

    static async createNewFolder(name: folderToSubmit){
        const foldersCreate: AxiosResponse<folder> = await AxiosServices.postInDataBase('/folder',name) as AxiosResponse
        return foldersCreate
    }

    static async deleteOneFolder(folder_id: string){
        const responseServerDeletionFolder:AxiosResponse = await AxiosServices.deleteElementOnServer(`/folder/${folder_id}`) as AxiosResponse
        return responseServerDeletionFolder.status
    }
}