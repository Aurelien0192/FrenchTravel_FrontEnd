import { Loader, Modal, Pagination } from "@mantine/core"
import { HotelCategorieOrNoteShow } from "../Places/HotelCategorieOrNotationShow"
import { useComment } from "../../../Module/Comment/comment.hook"
import { Like } from "../../Components/svg/Like"
import { Button } from "../../Components/General/Button"
import { useDisclosure } from "@mantine/hooks"
import { TextArea } from "../../Components/General/TextArea"
import { FormularServices } from "../../../Module/FormularGeneralServices/formularServices"
import { comment } from "../../../Module/Comment/comment.type"
import { useState } from "react"
import { CommentService } from "../../../Module/Comment/comment.service"
import { CommentResponseCard } from "./CommentResponseCard"
import { Comment } from "../../../Module/Comment/comment.class"
import { IoCheckmarkCircleOutline } from "react-icons/io5"

type commentsViewerProps={
    visitor_id:string|null
    idOfPlaceOrUser: string
    findBy: string
    variant: 1|2|3
}

export const CommentsViewer:React.FC<commentsViewerProps> = (props) => {

    const {page, commentsTab, numberOfElement, changePage, LikeAComment} = useComment(props.idOfPlaceOrUser, props.findBy,props.visitor_id?props.visitor_id:null)
    const [RespondCommentModal, RespondCommentModalManager] = useDisclosure()
    const [msg, setMsg] = useState<string>("")

    const changeMsgComment = async (e:React.FormEvent<HTMLFormElement>, comment_id:string) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const comment:comment = JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))

      const newMsgComment = await FormularServices.addResponseOfServer(CommentService.respondToComment(comment,comment_id), "comment")
      setMsg(newMsgComment)
    }

    if (commentsTab){

        return(
            <div className="flex flex-col gap-3 items-center">
                {commentsTab.map((comment, index)=>{
                    if(props.variant === 1 || props.variant === 3){
                        return(
                            <div className="flex flex-col gap-3 items-end w-full">
                                {!comment.getIsResponse() && 
                                    <div key={index} className={props.variant===3?"w-full flex px-2.5 py-1.5 gap-2.5 rounded-xl shadow":"flex w-full p-2.5"} >
                                        <div className="flex flex-col gap-4 border-r-2 border-black w-72">
                                            <div>
                                                <img className="size-10 rounded-full object-cover" src={comment.getProfilePhoto()} />
                                                <p>{comment.getUsernamePoster()}</p>
                                            </div>
                                            <p className="text-sm">{`publié le : ${comment.getCreateAt()}`}</p>
                                            <p className="text-sm">{`visité le : ${comment.getDateVisited()}`}</p>
                                        </div>
                                        <div className="pl-6 flex flex-col w-full justify-between">
                                            <div className="flex justify-between items-start">
                                                <HotelCategorieOrNoteShow type="circle" categorie={comment.getNote()} />
                                                {props.variant===3 && <p>{comment.getPlaceName()}</p>}
                                            </div>
                                            <p>{comment.getComment()}</p>
                                            <div className="flex justify-between">
                                                <div className="flex gap-2 items-center">
                                                    <p>{comment.getLike()}</p>
                                                    <button className="w-fit" onClick={()=>{LikeAComment(comment.getId())}}>
                                                        <Like liked={comment.getLiked()} />
                                                    </button>
                                                </div>
                                                {props.variant === 3 &&
                                                    comment.getResponse()?
                                                    <div className="flex gap-2 items-center">
                                                        <IoCheckmarkCircleOutline size="30px" color="#22c55e" />
                                                        <p className="text-green-500" >Commentaire répondu</p>
                                                    </div>
                                                    : props.variant === 3 && <Button size="xs" onClick={RespondCommentModalManager.open}>Répondre</Button>}
                                            </div>
                                            <Modal
                                                opened={RespondCommentModal}
                                                    onClose={RespondCommentModalManager.close}
                                                size="lg"
                                                centered
                                                overlayProps={{
                                                    backgroundOpacity:0.30,
                                                    color:'#D98D30',
                                                    blur:3,
                                                }}>
                                                <form onSubmit={(e)=>{changeMsgComment(e, comment.getId())}} className="flex flex-col gap-3 items-end">
                                                    <p className="w-full">Commentaires:</p>
                                                    <p className="rounded shadow p-2.5">{comment.getComment()}</p>
                                                    <TextArea label="Réponse :" flexDirection="flex-col" placeholder="Merci pour ce commentaire" name="comment" size="md" />
                                                    <Button type ="submit" size="xs">Envoyer</Button>
                                                    <p>{msg}</p>
                                                </form>
                                            </Modal>
                                        </div>
                                    </div>
                                }
                                {comment.getResponse() &&
                                    <div className="w-10/12">
                                        <CommentResponseCard response={comment.getResponse() as Comment}/>
                                    </div>    
                                }
                            </div>
                        )
                    }else{
                        return(
                            <div className="flex flex-col gap-3 items-end w-full">
                                <div key={index} className="w-full flex flex-col px-2.5 py-1.5 gap-2.5 rounded-xl shadow">
                                    <div className="flex justify-between items-center w-full">
                                        <h2 className="text-2xl font-bold">{comment.getPlaceName()}</h2>
                                        <p>{`publié le : ${comment.getCreateAt()}`}</p>
                                        <p>{`visité le : ${comment.getDateVisited()}`}</p>
                                    </div>
                                    <p>{comment.getComment()}</p>
                                    <div>
                                        <button className="w-fit" onClick={()=>{LikeAComment(comment.getId())}}>
                                            <Like liked={comment.getLiked()}/>
                                        </button>
                                    </div>
                                </div>
                                {comment.getResponse() &&
                                    <div className="w-10/12">
                                        <CommentResponseCard response={comment.getResponse() as Comment}/>
                                    </div>    
                                }
                            </div>
                        )
                    }
                })}
                <Pagination 
                    total={numberOfElement ? Math.ceil(numberOfElement/5) : 1}
                    color={"#8C3616"}
                    value={page}
                    onChange={(value:number) => changePage(value)}
                    onNextPage={() => changePage(page+1)}
                    onPreviousPage={() => changePage(page-1)} />
            </div>
    )
    }else{
        <Loader />
    }
}