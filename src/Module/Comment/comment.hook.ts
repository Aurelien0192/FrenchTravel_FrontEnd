import { useState, useEffect } from "react"
import { CommentService } from "./comment.service"
import { Comment } from "./comment.class"

export const useComment = (idOfPlaceOrUser:string) => {
    const [commentsTab, setCommentsTab] = useState<Array<Comment>>([])
    const [page, setPage] = useState<number>(1)
    const [numberOfElement, setNumberOfElement] = useState<number>(0)

    function changePage(newPage:number){
        setPage(newPage)
    }

    useEffect(()=>{
        async function getComments(){
            const responseServerComments = await CommentService.findManyComments(page, 5, idOfPlaceOrUser, "populateuser_id")
            console.log(responseServerComments)
            setCommentsTab(responseServerComments.comments)
            setNumberOfElement(responseServerComments.nbOfCommments)
        }
        getComments()
    },[page])

    return {page, commentsTab, numberOfElement, changePage}
}