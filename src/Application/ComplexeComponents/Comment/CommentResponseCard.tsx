import { Comment } from "../../../Module/Comment/comment.class"

type commentResponseCard = {
    response: Comment
}

export const CommentResponseCard:React.FC<commentResponseCard> = (props) =>{
    return(
        <div className="flex p-2.5 bg-sand rounded">
            <div className="flex flex-col gap-4 border-r-2 border-black w-72">
                <img className="size-10 rounded-full object-cover" src={props.response.getProfilePhoto()} />
                <p>{props.response.getUsernamePoster()}</p>
                <p>{`le : ${props.response.getCreateAt()}`}</p>
            </div>
            <div className="pl-6 flex flex-col w-full justify-between">
                <p>{props.response.getComment()}</p>
            </div>
        </div>
    )
}