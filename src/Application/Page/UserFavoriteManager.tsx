import { FormEvent, useEffect, useState } from "react"
import { SelectorButton } from "../Components/General/SelectorButton"
import { SearchBar } from "../Components/General/SearchBar"
import { Button } from "../Components/General/Button"
import { Favorite } from "../../Module/Favorite/Favorite.class"
import { responseServerGetManyFavorites } from "../../Module/Favorite/Favorite.type"
import { FavoriteService } from "../../Module/Favorite/Favorite.service"
import { Loader, Pagination } from "@mantine/core"
import { PlaceDisplayLittleCard } from "../ComplexeComponents/Places/PlaceDisplayLittleCards"
import { Folder } from "../../Module/Folder/Folder.class"
import { folder, folderToSubmit, responseServerGetManyFolders } from "../../Module/Folder/Folder.type"
import { FolderService } from "../../Module/Folder/Folder.service"
import { FolderButton } from "../Components/General/FolderButton"
import { Input } from "../Components/General/Input"
import { AxiosResponse } from "axios"
import { IoTrash } from "react-icons/io5"
import { useClickOutside } from "@mantine/hooks"

export const UserFavoriteManager:React.FC = () =>{
    const categoriesFavorites:Array<string> = ["Tous","Hôtel","Restaurant","Activité"]
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [folderSelected, setFolderSelected] = useState<number>(0)
    const [responseServerDone, setResponseServerDone] = useState<boolean>(false)
    const [idFolderSelected, setIdFolderSelected] = useState<string>("")
    const [folders, setFolders] = useState<Array<Folder>>([])
    const [favorites, setFavorites] = useState<Array<Favorite>>([])
    const [hidden, setHidden] = useState<boolean>(true)
    const [hiddenTrash, setHiddenTrash] = useState<boolean>(true)
    const [nbOfPage, setNbOfPage] = useState<number>(0)
    const [page, setPage] = useState<number>(1)

    const ref = useClickOutside(() => setHidden(true))

    function changeSelected(index:number){
        setSelectedIndex(index)
    }

    useEffect(()=>{
        setFavoriteManager()
    },[idFolderSelected, folderSelected, page])

    function changePage(newPage: number){
        setPage(newPage)
    }

    async function setFavoriteManager(){
        const responseServerFavorites: responseServerGetManyFavorites = await FavoriteService.getsFavoritesOfUser(page,idFolderSelected)
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

    function drag(e:React.DragEvent<HTMLDivElement>){
        setHiddenTrash(false)
        e.dataTransfer.setData("text",e.currentTarget.id)
    }

    function allowDrop(e:React.DragEvent<HTMLDivElement|SVGElement>){
        e.preventDefault()
    }

    async function drop(e:React.DragEvent<HTMLDivElement>, folder_id:string|undefined){
        const favorite_id:string=e.dataTransfer.getData("text")
        const response: AxiosResponse = await FavoriteService.udpateFavorite(favorite_id, {folder:folder_id})
        console.log(response.status)
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

    return(
        <div className="w-full flex gap-4">
            <aside className="flex flex-col relative justify-between w-1/4 h-[95lvh]">
                    <Button onClick={()=>{setHidden(!hidden)}} size="xs">nouveau dossier</Button>
                    <div className="rounded-lg border border-black h-5/6 w-full">
                        <div className="flex flex-col p-2">
                            <FolderButton selected={folderSelected===0} onClick={()=>{setFolderSelected(0);setIdFolderSelected("")}}>Tous</FolderButton>
                            <div onDragOver={(e)=>{allowDrop(e)}} onDragEnter={(e)=>{e.currentTarget.style.background="#F2E2CE"}} onDragLeave={(e)=>{e.currentTarget.style.background="#ffffff"}} onDrop={(e)=>{drop(e,undefined);e.currentTarget.style.background="#ffffff"}}>
                                <FolderButton selected={folderSelected===1} onClick={()=>{setFolderSelected(1);setIdFolderSelected("uncategorized")}}>Non catégorisé</FolderButton>
                            </div>
                            {folders.length>0 && folders.map((folder,index)=>{
                                return (
                                <div onDragOver={(e)=>{allowDrop(e)}} onDragEnter={(e)=>{e.currentTarget.style.background="#F2E2CE"}} onDragLeave={(e)=>{e.currentTarget.style.background="#ffffff"}} onDrop={(e)=>{drop(e, folder.getId());e.currentTarget.style.background="#ffffff"}}>
                                    <FolderButton onClickButtonDelete={()=>{deleteFolder(folder.getId())}} folder={folder} menu={true} selected={folderSelected===(index+2)} onClick={()=>{setFolderSelected((index+2));setIdFolderSelected(folder.getId())}} key={index}>{folder.getName()}</FolderButton>
                                </div>)
                            })}
                            <form ref={ref} onSubmit={(e)=>{createNewFolder(e)}} className={`${hidden && "hidden"} flex flex-col gap-2 p-2 rounded shadow bg-white`}>
                                <Input placeholder="nouveau nom" name="name" />
                                <Button size="xs" type="submit">Valider</Button>
                            </form>
                        </div>
                    </div>
                    <IoTrash onDragOver={(e)=>{allowDrop(e)}} onDrop={(e)=>{dropDelete(e)}} className={`fixed z-0 left-36 bottom-20 ${hiddenTrash && "hidden"}`} fill="#808080" size={"100px"} />
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
                <div className="flex flex-col justify-between h-[95lvh] items-center">
                    <div className="grid grid-cols-3 justify-between gap-y-4">
                        {favorites.map((favorite)=>{return(
                            <div id={favorite.getId()} draggable={true} onDragStart={(e)=>{drag(e)}} onDragEnd={()=>{setHiddenTrash(true)}}>
                                <PlaceDisplayLittleCard type="little" place={favorite.getPlace()} />
                            </div>
                        )})}
                    </div>
                    <Pagination 
                        total={nbOfPage}
                        color={"#8C3616"}
                        value={page}
                        onChange={(value:number) => changePage(value)}
                        onNextPage={() => changePage(page+1)}
                        onPreviousPage={() => changePage(page-1)} 
                    />
                </div>
                :responseServerDone?<p>Aucun lieu dans ce dossier</p>:<Loader />
                }
            </div>
        </div>
    )
}