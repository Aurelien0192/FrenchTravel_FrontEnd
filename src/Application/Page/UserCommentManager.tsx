import { Loader } from "@mantine/core"
import { useAuthentification } from "../../Module/Authentification/authentification.hook"
import { CommentsViewer } from "../ComplexeComponents/Comment/CommentsViewer"
import { SearchBar } from "../Components/General/SearchBar"
import { SelectorNavLink } from "../Components/General/SelectorNavLink"
import { useState } from "react"

export const UserCommentManager:React.FC = () => {

    const {authentifiateUser} = useAuthentification()
    const [valueOfSearch, setValueOfSearch] = useState<string>()

    return(
        <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-3 w-full">
                <div className="flex">
                    <SelectorNavLink to="/index/user/profile" selected={false}>{Object.keys(authentifiateUser).length>0 && authentifiateUser.getUserType() ==="professional" ?"Mes établissements": "Mes photos"}</SelectorNavLink>
                    <SelectorNavLink to="/index/user/comment" selected={true}>Mes commentaires</SelectorNavLink>
                </div>
                <SearchBar onSubmit={(e)=>{e.preventDefault();setValueOfSearch(JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))).search)}}/>
            </div>
            {Object.keys(authentifiateUser).length>0 ? 
                <div className="w-full">
                    <CommentsViewer search={valueOfSearch} visitor_id={Object.keys(authentifiateUser).length>0?authentifiateUser.getId():null} variant={Object.keys(authentifiateUser).length>0 && authentifiateUser.getUserType() ==="professional"?3:2} findBy={Object.keys(authentifiateUser).length>0? authentifiateUser.getUserType() === "professional"? "owner":"user_id":"user_id"} idOfPlaceOrUser={authentifiateUser.getId()} /> 
                </div>
                    : <Loader />
            }
        </div>
    )
}