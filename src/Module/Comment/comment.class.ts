import { comment, commentFromServer } from "./comment.type"

export class CommentToSend{
    public comment: string
    public note: number
    public dateVisited: Date
    public categorie? : string

    constructor(newComment: comment){
        this.comment = newComment.comment
        this.note = newComment.note
        this.dateVisited = new Date(newComment.dateVisited)
        this.categorie = newComment.categorie? newComment.categorie: undefined
    }

    static createNewComment = (comment:comment):CommentToSend => {
        const newComment:CommentToSend = new CommentToSend(comment)
        return newComment
    }
}

export class Comment{
    private id: string
    private comment: string
    private note:number
    private dateVisited: string
    private create_at: string
    private usernamePoster?: string
    private profilePhotoUser?:string
    private placeName?:string
    private like:number
    private liked:boolean
    private response?: Comment
    private isResponse: boolean

    constructor(comment:commentFromServer){
        console.log(comment)
        this.id = comment._id
        this.comment = comment.comment
        this.note = comment.note
        this.like = comment.like
        this.dateVisited = new Date(comment.dateVisited).toLocaleDateString()
        this.create_at = new Date(comment.create_at).toLocaleDateString()
        this.usernamePoster = typeof comment.user_id !== "string" ? comment.user_id.username : undefined
        this.profilePhotoUser = typeof comment.user_id !== "string" ?"http://localhost:3001/"+comment.user_id.profilePhoto.path :undefined
        this.placeName = typeof comment.place_id !== "string" ? comment.place_id.name : undefined
        this.liked = comment.liked
        this.isResponse = comment.isResponse
        this.response = (comment.response && typeof comment.response === "object")? new Comment(comment.response) : undefined
    }

    getId(){
        return this.id
    }

    getComment(){
        return this.comment
    }
    
    getLike(){
        return this.like
    }

    setLike(newNumber: number){
        this.like = this.like + newNumber

    }
    
    getNote(){
        return this.note
    }

    getDateVisited(){
        return this.dateVisited
    }

    getCreateAt(){
        return this.create_at
    }

    getUsernamePoster(){
        return this.usernamePoster
    }

    getProfilePhoto(){
        return this.profilePhotoUser
    }

    getPlaceName(){
        return this.placeName
    }

    getLiked(){
        return this.liked
    }

    setLiked(){
        this.liked = !this.liked
    }

    getIsResponse(){
        return this.isResponse
    }

    getResponse(){
        return this.response
    }

    static createNewComment(comment: commentFromServer):Comment{
        const newComment = new Comment(comment)
        return newComment
    }
}