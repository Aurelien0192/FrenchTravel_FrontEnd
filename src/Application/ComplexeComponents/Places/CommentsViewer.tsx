import { useEffect, useState } from "react"
import { CommentService } from "../../../Module/Comment/comment.service"
import { Loader, Pagination } from "@mantine/core"
import { responseGetManyComments } from "../../../Module/HTTP/axiosResponseError.type"
import { commentFromServer } from "../../../Module/Comment/comment.type"
import { HotelCategorieOrNoteShow } from "./HotelCategorieOrNotationShow"

type commentsViewerProps={
    idOfPlaceOrUser: string
}

export const CommentsViewer:React.FC<commentsViewerProps> = (props) => {

    const [commentsTab, setCommentsTab] = useState<Array<commentFromServer>>([])
    const [page, setPage] = useState<number>(1)
    const [numberOfElement, setNumberOfElement] = useState<number>(0)

    function changePage(newPage:number){
        setPage(newPage)
    }

    useEffect(()=>{
        async function getComments(){
            const responseServerComments:responseGetManyComments = await CommentService.findManyComments(page, 5, props.idOfPlaceOrUser, "populate")
            console.log(responseServerComments)
            setCommentsTab(responseServerComments.results)
            setNumberOfElement(responseServerComments.count)
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
                                <img className="size-10 rounded-full object-cover" src={`http://localhost:3001/${comment.user_id.profilePhoto.path}`} />
                                <p>{comment.user_id.username}</p>
                                <p className="text-sm">{`publié le : ${new Date(comment.create_at).toLocaleDateString()}`}</p>
                                <p className="text-sm">{`visité le : ${new Date(comment.dateVisited).toLocaleDateString()}`}</p>
                            </div>
                            <div className="pl-6 flex flex-col gap-4">
                                <HotelCategorieOrNoteShow type="circle" categorie={comment.note} />
                                <p>{comment.comment}</p>
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