import { folder } from "./Folder.type"

export class Folder{
    private id: string
    private name: string

    constructor(folderFromServer: folder){
        this.id = folderFromServer._id
        this.name = folderFromServer.name
    }

    getId(){
        return this.id
    }

    getName(){
        return this.name
    }

    static createNewFolder(folderFromServer: folder){
        const newFolder = new Folder(folderFromServer)
        return newFolder
    }
}