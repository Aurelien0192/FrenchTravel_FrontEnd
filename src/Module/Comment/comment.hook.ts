import { useState, useEffect } from "react"
import { CommentService } from "./comment.service"
import { Comment } from "./comment.class"

export const useComment = (idOfPlaceOrUser:string, findBy:string,visitor_id:string|null,search:string|null) => {
    const [commentsTab, setCommentsTab] = useState<Array<Comment>|undefined>(undefined)
    const [page, setPage] = useState<number>(1)
    const [numberOfElement, setNumberOfElement] = useState<number>(0)
    const [notationChoice, setNotationChoice] = useState<Array<number>>([])

    function changePage(newPage:number){
        setPage(newPage)
    }

    useEffect(()=>{
        async function getComments(){
            const responseServerComments = findBy==="owner"? 
                await CommentService.findManyCommentsByOwner(page, 5, visitor_id, search)
                :await CommentService.findManyComments(page, 5, idOfPlaceOrUser, findBy, findBy ==="place_id" ?"populateuser_id": "populateplace_id",visitor_id,notationChoice)
            setCommentsTab(responseServerComments.comments)
            setNumberOfElement(responseServerComments.nbOfCommments)
        }
        getComments()
    },[page, idOfPlaceOrUser,visitor_id,notationChoice, search])

    async function LikeAComment(comment_id:string){
        if(commentsTab){
            const commentLiked = [...commentsTab]
            const index = commentLiked.findIndex((comment)=>comment.getId() === comment_id)
            commentLiked[index].getLiked() ? await CommentService.unLikeAComment(comment_id) : await CommentService.likeAComment(comment_id) 
            commentLiked[index].getLiked()? commentLiked[index].setLike(-1): commentLiked[index].setLike(+1)
            commentLiked[index].setLiked()
            setCommentsTab(commentLiked)
        }
    }

    function changeNotationChoice(notation: number, checked:boolean){
        const notationFilterTab:Array<number> = [... notationChoice]
        if(checked){
            notationFilterTab.push(notation)
        }else{
            const index:number = notationFilterTab.indexOf(notation)
            notationFilterTab.splice(index, 1)
        }
        setNotationChoice(notationFilterTab)
    }

    return {page, commentsTab, numberOfElement, changeNotationChoice, changePage, LikeAComment}
}