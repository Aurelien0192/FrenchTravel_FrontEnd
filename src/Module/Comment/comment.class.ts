import { comment } from "./comment.type"

export class Comment{
    public comment: string
    public note: number
    public dateVisited: Date

    constructor(newComment: comment){
        this.comment = newComment.comment
        this.note = newComment.note
        this.dateVisited = new Date(newComment.dateVisited)
    }

    static createNewComment = (comment:comment):Comment => {
        const newComment:Comment = new Comment(comment)
        return newComment
    }
}