import { useEffect, useState } from "react"
import { CommentService } from "../../../Module/Comment/comment.service"
import { Loader, Pagination } from "@mantine/core"
import { HotelCategorieOrNoteShow } from "./HotelCategorieOrNotationShow"
import { Comment } from "../../../Module/Comment/comment.class"

type commentsViewerProps={
    idOfPlaceOrUser: string
}

export const CommentsViewer:React.FC<commentsViewerProps> = (props) => {

    const [commentsTab, setCommentsTab] = useState<Array<Comment>>([])
    const [page, setPage] = useState<number>(1)
    const [numberOfElement, setNumberOfElement] = useState<number>(0)

    function changePage(newPage:number){
        setPage(newPage)
    }

    useEffect(()=>{
        async function getComments(){
            const responseServerComments = await CommentService.findManyComments(page, 5, props.idOfPlaceOrUser, "populateuser_id")
            console.log(responseServerComments)
            setCommentsTab(responseServerComments.comments)
            setNumberOfElement(responseServerComments.nbOfCommments)
        }
        getComments()
    },[page])

    if (commentsTab){

        return(
            <div className="flex flex-col gap-2 items-center">
                {commentsTab.map((comment, index)=>{
                    return(
                        <div className="flex w-full p-2.5" key={index}>
                            <div className="flex flex-col gap-4 border-r-2 border-black w-52">
                                <img className="size-10 rounded-full object-cover" src={comment.getProfilePhoto()} />
                                <p>{comment.getUsernamePoster()}</p>
                                <p className="text-sm">{`publié le : ${comment.getCreateAt()}`}</p>
                                <p className="text-sm">{`visité le : ${comment.getDateVisited()}`}</p>
                            </div>
                            <div className="pl-6 flex flex-col gap-4">
                                <HotelCategorieOrNoteShow type="circle" categorie={comment.getNote()} />
                                <p>{comment.getComment()}</p>
                            </div>
                        </div>
                    )
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