import { FormEvent, useEffect, useState } from "react"
import { SelectorButton } from "../Components/General/SelectorButton"
import { SearchBar } from "../Components/General/SearchBar"
import { Button } from "../Components/General/Button"
import { Favorite } from "../../Module/Favorite/Favorite.class"
import { responseServerGetManyFavorites } from "../../Module/Favorite/Favorite.type"
import { FavoriteService } from "../../Module/Favorite/Favorite.service"
import { Loader } from "@mantine/core"
import { PlaceDisplayLittleCard } from "../ComplexeComponents/Places/PlaceDisplayLittleCards"
import { Folder } from "../../Module/Folder/Folder.class"
import { folder, folderToSubmit, responseServerGetManyFolders } from "../../Module/Folder/Folder.type"
import { FolderService } from "../../Module/Folder/Folder.service"
import { FolderButton } from "../Components/General/FolderButton"
import { Input } from "../Components/General/Input"
import { AxiosResponse } from "axios"

export const UserFavoriteManager:React.FC = () =>{
    const categoriesFavorites:Array<string> = ["Tous","Hôtel","Restaurant","Activité"]
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [folders, setFolders] = useState<Array<Folder>>([])
    const [favorites, setFavorites] = useState<Array<Favorite>>([])
    const [hidden, setHidden] = useState<boolean>(true)
    function changeSelected(index:number){
        setSelectedIndex(index)
    }

    useEffect(()=>{
        setFavoriteManager()
    },[])

    async function setFavoriteManager(){
        const responseServerFavorites: responseServerGetManyFavorites = await FavoriteService.getsFavoritesOfUser()
        const responseServerFolders: responseServerGetManyFolders = await FolderService.getFolderFromServer()
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

    }

    function drag(e:React.DragEvent<HTMLDivElement>){
        e.dataTransfer.setData("text",e.currentTarget.id)
    }

    function allowDrop(e:React.DragEvent<HTMLDivElement>){
        e.preventDefault()
    }

    async function drop(e:React.DragEvent<HTMLDivElement>, folder_id:string){
        const favorite_id:string=e.dataTransfer.getData("text")
        const response: AxiosResponse = await FavoriteService.udpateFavorite(favorite_id, {folder:folder_id})
        console.log(response.status)
    }

    return(
        <div className="w-full flex gap-4">
            <aside className="flex flex-col justify-between w-1/4 h-[70lvh]">
                    <Button onClick={()=>{setHidden(!hidden)}} size="xs">nouveau dossier</Button>
                    <div className="rounded-lg border border-black h-5/6 w-full">
                        <div className="flex flex-col p-2">
                            <FolderButton>Tous</FolderButton>
                            <FolderButton>Non catégorisé</FolderButton>
                            {folders.length>0 && folders.map((folder,index)=>{
                                return (
                                <div onDragOver={(e)=>{allowDrop(e)}} onDrop={(e)=>drop(e, folder.getId())}>
                                    <FolderButton key={index}>{folder.getName()}</FolderButton>
                                </div>)
                            })}
                            <form onSubmit={(e)=>{createNewFolder(e)}} className={`${hidden && "hidden"} flex flex-col gap-2 p-2 rounded shadow bg-white`}>
                                <Input placeholder="nouveau nom" name="name" />
                                <Button size="xs" type="submit">Valider</Button>
                            </form>
                        </div>
                    </div>
            </aside>
            <div className="w-full flex flex-col gap-2">
                <div className="flex">
                    {categoriesFavorites.map((category, index)=>{
                        return(
                            <div>
                                <SelectorButton onClick={()=>{changeSelected(index)}} key={index} selected={selectedIndex === index} value={category}>{category}</SelectorButton>
                            </div>
                        )
                    })}
                </div>
                <SearchBar placeholder="rechercher dans vos favoris" />
                {favorites.length>0?
                <div>
                    {favorites.map((favorite)=>{return(
                        <div id={favorite.getId()} draggable={true} onDragStart={(e)=>{drag(e)}}>
                            test
                            <PlaceDisplayLittleCard type="little" place={favorite.getPlace()} />
                        </div>
                    )})}
                </div>
                :<Loader />
                }
            </div>
            
        </div>
    )
}