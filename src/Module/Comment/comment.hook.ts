import { useState, useEffect } from "react"
import { CommentService } from "./comment.service"
import { Comment } from "./comment.class"

export const useComment = (idOfPlaceOrUser:string, findBy:string,visitor_id:string|null) => {
    const [commentsTab, setCommentsTab] = useState<Array<Comment>>([])
    const [page, setPage] = useState<number>(1)
    const [numberOfElement, setNumberOfElement] = useState<number>(0)

    function changePage(newPage:number){
        setPage(newPage)
    }

    useEffect(()=>{
        async function getComments(){
            const responseServerComments = await CommentService.findManyComments(page, 5, idOfPlaceOrUser, findBy, findBy ==="place_id" ?"populateuser_id": "populateplace_id",visitor_id)
            console.log(responseServerComments)
            setCommentsTab(responseServerComments.comments)
            setNumberOfElement(responseServerComments.nbOfCommments)
        }
        getComments()
    },[page, idOfPlaceOrUser,visitor_id])

    async function LikeAComment(comment_id:string){
        await CommentService.likeAComment(comment_id)
        const commentLiked = [...commentsTab]
        const index = commentLiked.findIndex((comment)=>comment.getId() === comment_id)
        commentLiked[index].setLiked()
        setCommentsTab(commentLiked)
    }

    return {page, commentsTab, numberOfElement, changePage, LikeAComment}
}