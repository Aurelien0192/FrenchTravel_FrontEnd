import { SelectorButton } from "../Components/General/SelectorButton"
import { SearchBar } from "../Components/General/SearchBar"
import { Button } from "../Components/General/Button"
import { Pagination } from "@mantine/core"
import { PlaceDisplayLittleCard } from "../ComplexeComponents/Places/PlaceDisplayLittleCards"
import { FolderButton } from "../Components/General/FolderButton"
import { Input } from "../Components/General/Input"
import { IoCloseSharp, IoTrash } from "react-icons/io5"
import { useUserFavoriteManager } from "../../Module/UserFavoriteManager/userFavoriteManager.hook"
import { useState } from "react"
import { FrenchTravelAnimated } from "../Components/svg/FrenchTravelAnimated"

export const UserFavoriteManager:React.FC = () =>{

    
    const categoriesFavorites:Array<string> = ["Tous","Hôtel","Restaurant","Activité"]
    
    const {page,folders,favorites,selectedIndexCategorie,responseServerDone,hidden,folderSelected,hiddenTrash,nbOfPage,ref,changeHiddenTrash, changeFolderSelected, changeHidden, changeIdFolderSelected,createNewFolder,drag,allowDrop,drop, dropDelete,deleteFolder, changePage, changeSelectedCategorie,searchPlace} = useUserFavoriteManager()
    const [hiddenFolderManager, setHiddenFolderManager] = useState(true)

    return(
        <div className="relative w-full flex flex-col-reverse md:flex-row gap-4">
            <aside className={`flex flex-col top-0 bottom-0 right-0 left-0 w-full bg-white z-50 absolute ${hiddenFolderManager && "hidden"} md:relative md:flex gap-16 md:w-1/4 md:h-[95lvh]`}>
                    <div className="flex justify-between items-center">
                        <Button onClick={()=>{changeHidden()}} size="xs">nouveau dossier</Button>
                        <button className=" md:hidden" onClick={()=>{setHiddenFolderManager(true)}}>
                            <IoCloseSharp size="40px" />
                        </button>
                    </div>
                    <div className="rounded-lg border border-black h-5/6 w-full">
                        <div className="flex flex-col p-2">
                            <FolderButton selected={folderSelected===0} onClick={()=>{changeFolderSelected(0);changeIdFolderSelected("")}}>Tous</FolderButton>
                            <div onDragOver={(e)=>{allowDrop(e)}} onDragEnter={(e)=>{e.currentTarget.style.background="#F2E2CE"}} onDragLeave={(e)=>{e.currentTarget.style.background="#ffffff"}} onDrop={(e)=>{drop(e,undefined);e.currentTarget.style.background="#ffffff"}}>
                                <FolderButton selected={folderSelected===1} onClick={()=>{changeFolderSelected(1);changeIdFolderSelected("uncategorized")}}>Non catégorisé</FolderButton>
                            </div>
                            {folders.length>0 && folders.map((folder,index)=>{
                                return (
                                <div key={index} onDragOver={(e)=>{allowDrop(e)}} onDragEnter={(e)=>{e.currentTarget.style.background="#F2E2CE"}} onDragLeave={(e)=>{e.currentTarget.style.background="#ffffff"}} onDrop={(e)=>{drop(e, folder.getId());e.currentTarget.style.background="#ffffff"}}>
                                    <FolderButton onClickButtonDelete={()=>{deleteFolder(folder.getId())}} folder={folder} menu={true} selected={folderSelected===(index+2)} onClick={()=>{changeFolderSelected((index+2));changeIdFolderSelected(folder.getId())}}>{folder.getName()}</FolderButton>
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
                <div className="flex flex-col-reverse md:flex-row">
                    {categoriesFavorites.map((category, index)=>{
                        return(
                            <SelectorButton onClick={()=>{changeSelectedCategorie(index)}} key={index} selected={selectedIndexCategorie === index} value={category}>{category}</SelectorButton>
                        )
                    })}
                <SearchBar onSubmit={(e)=>{e.preventDefault();searchPlace(e)}} placeholder="rechercher dans vos favoris" />
                </div>
                <div className="md:hidden">
                    <Button size="xs" onClick={()=>{setHiddenFolderManager(false)}}>Dossiers</Button>
                </div>
                {favorites.length>0?
                <div className="flex flex-col justify-between justify-items-center gap-5 md:h-[95lvh] mt-10 w-full items-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-5 w-full ">
                        {favorites.map((favorite, index)=>{return(
                            <div key={index} id={favorite.getId()} draggable={true} onDragStart={(e)=>{drag(e)}} onDragEnd={()=>{changeHiddenTrash(true)}}>
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
                :responseServerDone?<p>Aucun lieu dans ce dossier</p>:<FrenchTravelAnimated />
                }
            </div>
        </div>
    )
}