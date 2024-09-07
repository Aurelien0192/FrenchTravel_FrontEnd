import { Pagination } from "@mantine/core"
import { useComment } from "../../../Module/Comment/comment.hook"
import { Like } from "../../Components/svg/Like"
import { FormularServices } from "../../../Module/FormularGeneralServices/formularServices"
import { comment } from "../../../Module/Comment/comment.type"
import { useState } from "react"
import { CommentService } from "../../../Module/Comment/comment.service"
import { CommentResponseCard } from "./CommentResponseCard"
import { Comment } from "../../../Module/Comment/comment.class"
import { CommentFilter } from "./CommentFilter"
import { FrenchTravelAnimated } from "../../Components/svg/FrenchTravelAnimated"
import { CommentCard } from "./CommentCards"

type commentsViewerProps={
    visitor_id:string|null
    idOfPlaceOrUser: string
    findBy: string
    variant: 1|2|3
    filter?:boolean
    search?:string
}

export const CommentsViewer:React.FC<commentsViewerProps> = (props) => {

    const {page, commentsTab, numberOfElement, changeNotationChoice, changePage, LikeAComment} = useComment(props.idOfPlaceOrUser, props.findBy,props.visitor_id?props.visitor_id:null, props.search?props.search:null)
    const [msg, setMsg] = useState<string>("")
         
    const changeMsgComment = async (e:React.FormEvent<HTMLFormElement>, comment_id:string) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const comment:comment = JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))

      const newMsgComment = await FormularServices.addResponseOfServer(CommentService.respondToComment(comment,comment_id), "comment")
      setMsg(newMsgComment)
      console.log(commentsTab)
    }

    if (commentsTab){
        return(
            <div className="flex flex-col-reverse md:flex-row-reverse md:gap-32 w-full">
                <div className="flex flex-col gap-3 items-center w-full">
                    {commentsTab.length!==0 ? commentsTab.map((comment, index)=>{
                        if(props.variant === 1 || props.variant === 3){
                            return(
                                <CommentCard index= {index} comment={comment} variant={props.variant} msg={msg} onSubmit={(e)=>{changeMsgComment(e, comment.getId())}} LikeComment={()=>{LikeAComment(comment.getId())}} />
                            )
                        }else{
                            return(
                                <div key={index} className="flex flex-col gap-3 items-end w-full">
                                    <div className="w-full flex flex-col px-2.5 py-1.5 gap-2.5 rounded-xl shadow">
                                        <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-start w-full">
                                            <h2 className="text-2xl font-bold">{comment.getPlaceName()}</h2>
                                            <p>{`publié le : ${comment.getCreateAt()}`}</p>
                                            <p>{`visité le : ${comment.getDateVisited()}`}</p>
                                        </div>
                                        <p className="border-t-2 border-black md:border-t-0">{comment.getComment()}</p>
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
                    
                    }):<p className="font-bold">Aucun commentaire</p>}
                    <Pagination 
                        total={numberOfElement ? Math.ceil(numberOfElement/5) : 1}
                        color={"#8C3616"}
                        value={page}
                        hidden={numberOfElement===0}
                        onChange={(value:number) => changePage(value)}
                        onNextPage={() => changePage(page+1)}
                        onPreviousPage={() => changePage(page-1)} />
                </div>
                {props.filter && <CommentFilter onChange={changeNotationChoice}/>}
            </div>
        )
    }else{
        return(
            <div className="flex justify-center mt-24">
                <FrenchTravelAnimated />
            </div>
        )
    }
}