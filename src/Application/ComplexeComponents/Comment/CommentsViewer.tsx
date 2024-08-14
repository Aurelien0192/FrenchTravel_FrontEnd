import { Loader, Pagination } from "@mantine/core"
import { HotelCategorieOrNoteShow } from "../Places/HotelCategorieOrNotationShow"
import { useComment } from "../../../Module/Comment/comment.hook"
import { Like } from "../../Components/svg/Like"

type commentsViewerProps={
    visitor_id:string|null
    idOfPlaceOrUser: string
    findBy: string
    variant: 1|2
}

export const CommentsViewer:React.FC<commentsViewerProps> = (props) => {

    const {page, commentsTab, numberOfElement, changePage, LikeAComment} = useComment(props.idOfPlaceOrUser, props.findBy,props.visitor_id?props.visitor_id:null)



    if (commentsTab){

        return(
            <div className="flex flex-col gap-3 items-center">
                {commentsTab.map((comment, index)=>{
                    if(props.variant === 1){
                        return(
                            <div key={index} className="flex w-full p-2.5" >
                                <div className="flex flex-col gap-4 border-r-2 border-black w-72">
                                    <div>
                                        <img className="size-10 rounded-full object-cover" src={comment.getProfilePhoto()} />
                                        <p>{comment.getUsernamePoster()}</p>
                                    </div>
                                    <p className="text-sm">{`publié le : ${comment.getCreateAt()}`}</p>
                                    <p className="text-sm">{`visité le : ${comment.getDateVisited()}`}</p>
                                </div>
                                <div className="pl-6 flex flex-col w-full justify-between">
                                    <HotelCategorieOrNoteShow type="circle" categorie={comment.getNote()} />
                                    <p>{comment.getComment()}</p>
                                    <div className="flex gap-2 items-center">
                                        <p>{comment.getLike()}</p>
                                        <button className="w-fit" onClick={()=>{LikeAComment(comment.getId())}}>
                                            <Like liked={comment.getLiked()} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }else{
                        return(
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