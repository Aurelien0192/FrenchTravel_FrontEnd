export type folder = {
    _id: string
    name: string
}

export type responseServerGetManyFolders={
    count:number,
    results:Array<folder>
}

export type folderToSubmit={
    name:string
}