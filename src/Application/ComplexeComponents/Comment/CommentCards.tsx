import { IoCheckmarkCircleOutline } from "react-icons/io5"
import { Comment } from "../../../Module/Comment/comment.class"
import { Like } from "../../Components/svg/Like"
import { HotelCategorieOrNoteShow } from "../Places/HotelCategorieOrNotationShow"
import { CustomModal } from "../../Components/General/CustomModal"
import { Button } from "../../Components/General/Button"
import { TextArea } from "../../Components/General/TextArea"
import { useDisclosure } from "@mantine/hooks"
import { CommentResponseCard } from "./CommentResponseCard"

type CommentCardProps = {
    index: number
    comment: Comment
    variant:1|3
    msg:string
    onSubmit: React.FormEventHandler<HTMLFormElement>
    LikeComment: React.MouseEventHandler<HTMLButtonElement>
}


export const CommentCard:React.FC<CommentCardProps> = (props) => {

    const [RespondCommentModal, RespondCommentModalManager] = useDisclosure()

    return(
        <div key={props.index} className="flex flex-col gap-3 items-end w-full">
            {!props.comment.getIsResponse() && 
                <div  className={`flex w-full flex-col md:flex-row gap-2 ${props.variant===3?" px-2.5 py-1.5 md:gap-2.5 rounded-xl shadow":"flex flex-col md:gap-0 p-2.5"}`} >
                    <div className="flex md:flex-col gap-4 border-b-2 md:border-r-2 md:border-b-0 border-black w-72">
                        <div>
                            <img className="size-10 rounded-full object-cover" src={props.comment.getProfilePhoto()} />
                            <p>{props.comment.getUsernamePoster()}</p>
                        </div>
                        <p className="text-sm">{`publié le : ${props.comment.getCreateAt()}`}</p>
                        <p className="text-sm">{`visité le : ${props.comment.getDateVisited()}`}</p>
                    </div>
                    <div className="pl-6 flex flex-col w-full justify-between">
                        <div className="flex justify-between items-start">
                            <HotelCategorieOrNoteShow type="circle" categorie={props.comment.getNote()} />
                            {props.variant===3 && <p>{props.comment.getPlaceName()}</p>}
                        </div>
                        <p>{props.comment.getComment()}</p>
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
                                <p>{props.comment.getLike()}</p>
                                <button disabled={sessionStorage.getItem("UserAuthentifiate")===null} className="w-fit" onClick={props.LikeComment}>
                                    <Like liked={props.comment.getLiked()} />
                                </button>
                            </div>
                            {props.variant === 3 &&
                                props.comment.getResponse()?
                                <div className="flex gap-2 items-center">
                                    <IoCheckmarkCircleOutline size="30px" color="#22c55e" />
                                    <p className="text-green-500" >Commentaire répondu</p>
                                </div>
                                : props.variant === 3 && <Button size="xs" onClick={RespondCommentModalManager.open}>Répondre</Button>}
                        </div>
                        <CustomModal opened={RespondCommentModal} onClose={RespondCommentModalManager.close} size="lg">
                            <form onSubmit={props.onSubmit} className="flex flex-col gap-3 items-end">
                                <p className="w-full">Commentaires:</p>
                                <p className="rounded shadow p-2.5">{props.comment.getComment()}</p>
                                <TextArea label="Réponse :" flexDirection="flex-col" placeholder="Merci pour ce commentaire" name="comment" size="md" />
                                <Button type ="submit" size="xs">Envoyer</Button>
                                <p>{props.msg}</p>
                            </form>
                        </CustomModal>
                    </div>
                </div>
            }
            {props.comment.getResponse() &&
                <div className="md:w-10/12">
                    <CommentResponseCard response={props.comment.getResponse() as Comment}/>
                </div>    
            }
        </div>
    )
}