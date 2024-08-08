import { Loader } from "@mantine/core"
import { useAuthentification } from "../../Module/Authentification/authentification.hook"
import { CommentsViewer } from "../ComplexeComponents/Comment/CommentsViewer"
import { SearchBar } from "../Components/General/SearchBar"
import { SelectorNavLink } from "../Components/General/SelectorNavLink"

export const UserCommentManager:React.FC = () => {

    const {authentifiateUser} = useAuthentification()

    return(
        <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-3 w-full">
                <div className="flex">
                    <SelectorNavLink to="/index/user/profile" selected={false}>{Object.keys(authentifiateUser).length>0 && authentifiateUser.getUserType() ==="professional" ?"Mes établissements": "Mes photos"}</SelectorNavLink>
                    <SelectorNavLink to="/index/user/comment" selected={true}>Mes commentaires</SelectorNavLink>
                </div>
                <SearchBar/>
            </div>
            {Object.keys(authentifiateUser).length>0 ? 
                <div className="w-full">
                    <CommentsViewer variant={2} findBy="user_id" idOfPlaceOrUser={authentifiateUser.getId()} /> 
                </div>
                    : <Loader />
            }
        </div>
    )
}