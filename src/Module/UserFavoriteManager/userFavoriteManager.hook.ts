import { FormEvent, useEffect, useState } from "react"
import { Folder } from "../Folder/Folder.class"
import { Favorite } from "../Favorite/Favorite.class"
import { responseServerGetManyFavorites } from "../Favorite/Favorite.type"
import { folder, folderToSubmit, responseServerGetManyFolders } from "../Folder/Folder.type"
import { FavoriteService } from "../Favorite/Favorite.service"
import { FolderService } from "../Folder/Folder.service"
import { AxiosResponse } from "axios"
import { SearchFilterServices } from "../SearchFilter/SearchFilter.service"
import { useClickOutside } from "@mantine/hooks"

export const useUserFavoriteManager = () => {
    const [selectedIndexCategorie, setSelectedIndexCategorie] = useState<number>(0)
    const [folderSelected, setFolderSelected] = useState<number>(0)
    const [responseServerDone, setResponseServerDone] = useState<boolean>(false)
    const [idFolderSelected, setIdFolderSelected] = useState<string>("")
    const [folders, setFolders] = useState<Array<Folder>>([])
    const [favorites, setFavorites] = useState<Array<Favorite>>([])
    const [hidden, setHidden] = useState<boolean>(true)
    const [hiddenTrash, setHiddenTrash] = useState<boolean>(true)
    const [nbOfPage, setNbOfPage] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const [categorie, setCategorie] = useState<string>("")
    const ref = useClickOutside(() => setHidden(true))

    useEffect(()=>{
        setFavoriteManager()
    },[idFolderSelected, folderSelected, page, search, categorie])

    function changeIdFolderSelected(id:string){
        setIdFolderSelected(id)
    }
    
    function changeHidden(hidden:boolean){
        setHidden(!hidden)
    }

    async function setFavoriteManager(){
        const responseServerFavorites: responseServerGetManyFavorites = await FavoriteService.getsFavoritesOfUser(page,idFolderSelected,search,categorie)
        setNbOfPage(Math.ceil(responseServerFavorites.count/9))
        setResponseServerDone(false)
        const responseServerFolders: responseServerGetManyFolders = await FolderService.getFoldersFromServer()
        setResponseServerDone(true)
        const favoritesToDisplay:Array<Favorite> = responseServerFavorites.results.map((favorite)=>{return Favorite.createNewFavorite(favorite)})
        const foldersOfUser : Array<Folder>= responseServerFolders.results.map((folder)=>{return Folder.createNewFolder(folder)})
        setFavorites(favoritesToDisplay)
        setFolders(foldersOfUser)
    }

    async function createNewFolder(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        const form : HTMLFormElement = e.currentTarget
        const formData = new FormData(form)
        const data: folderToSubmit = JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))
        const responseOfServerCreateFolder:AxiosResponse<folder> = await FolderService.createNewFolder(data)
        if(responseOfServerCreateFolder.status === 201){
            const newFolder: Folder = Folder.createNewFolder(responseOfServerCreateFolder.data)
            const foldersTab: Array<Folder> = [...folders]
            foldersTab.push(newFolder)
            setFolders(foldersTab)
        }
        setHidden(true)
    }

    function changeFolderSelected(index:number){
        setFolderSelected(index)
    }

    function drag(e:React.DragEvent<HTMLDivElement>){
        setHiddenTrash(false)
        e.dataTransfer.setData("text",e.currentTarget.id)
    }

    function allowDrop(e:React.DragEvent<HTMLDivElement|SVGElement>){
        e.preventDefault()
    }

    function changeHiddenTrash(hidden:boolean){
        setHiddenTrash(hidden)
    }

    async function drop(e:React.DragEvent<HTMLDivElement>, folder_id:string|undefined){
        const favorite_id:string=e.dataTransfer.getData("text")
        await FavoriteService.udpateFavorite(favorite_id, {folder:folder_id})
        setFavoriteManager()
    }

    async function dropDelete(e:React.DragEvent<SVGElement>){
        const favorite_id:string=e.dataTransfer.getData("text")
        const response: number = await FavoriteService.removeOfFavorite(favorite_id)
        if(response === 200){
            const favoritesTab = [...favorites]
            favoritesTab.splice(favoritesTab.findIndex((favorite)=>favorite.getId()=== favorite_id),1)
            setFavorites(favoritesTab)
        }
    }

    async function deleteFolder(folder_id:string){
        const responseStatus = await FolderService.deleteOneFolder(folder_id)
        if(responseStatus === 200){
            const foldersTab = [...folders]
            foldersTab.splice(foldersTab.findIndex((folder)=>folder.getId() === folder_id),1)
            setFolders(foldersTab)

            idFolderSelected===folder_id && setFolderSelected(0)
        }
    }

    function changePage(newPage: number){
        setPage(newPage)
    }

    function changeSelectedCategorie(index:number){
        setCategorie(SearchFilterServices.categoriesMap(index))
        setSelectedIndexCategorie(index)
    }

    async function searchPlace(e:FormEvent<HTMLFormElement>){
        const search:string = JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))).search
        setSearch(search)

    }
    return {page,folders,favorites,selectedIndexCategorie,folderSelected,responseServerDone,hidden,hiddenTrash,nbOfPage,ref,changeHiddenTrash,changeFolderSelected,changeHidden,changeIdFolderSelected,createNewFolder,drag,allowDrop,drop, dropDelete,deleteFolder, changePage, changeSelectedCategorie,searchPlace}
}