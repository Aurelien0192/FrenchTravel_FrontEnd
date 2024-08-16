import { AxiosResponse } from "axios";
import { AxiosServices } from "../HTTP/axios.services";
import { Comment, CommentToSend } from "./comment.class";
import { comment } from "./comment.type";
import { AxiosResponseError } from "../HTTP/axiosResponseError.dto";
import { responseGetManyComments } from "../HTTP/axiosResponseError.type";

export class CommentService{
    static async postNewComment(newComment:comment, id_place:string, categorie:"activity"|"restaurant"|"hotel", note: number){
        newComment.note = note
        newComment.categorie = categorie
        const comment: CommentToSend = CommentToSend.createNewComment(newComment)
        const response:AxiosResponse = await AxiosServices.postInDataBase(`/comment?place_id=${id_place}`,comment) as AxiosResponse
        const ResponseError = AxiosResponseError.createNewResponseError(response.data, response.status) 
        return ResponseError
    }

    static async respondToComment(newComment:comment, comment_id:string){
        newComment.note = 1
        const comment: CommentToSend = CommentToSend.createNewComment(newComment)
        const response:AxiosResponse = await AxiosServices.postInDataBase(`/responseComment/${comment_id}`,comment) as AxiosResponse
        const ResponseError = AxiosResponseError.createNewResponseError(response.data, response.status) 
        return ResponseError
    }

    static async findManyComments(page:number,limit:number, place_id:string, findBy:string, options:string, visitor_id:string|null, notationChoice:Array<number>){
        const response:responseGetManyComments = await AxiosServices.getDataFromDatabase(`/comments?page=${page}&limit=${limit}&${findBy}=${place_id}${visitor_id?`&visitor_id=${visitor_id}`:""}&options=${options}${notationChoice.map((note)=>{return (`&note=${note}`)}).join('')}`) as responseGetManyComments
        const comments : Array<Comment> = response.results.map((comment) =>{ return Comment.createNewComment(comment)})
        const nbOfCommments: number  = response.count
        return {comments, nbOfCommments}
    }

    static async findManyCommentsByOwner(page:number, limit:number, visitor_id:string|null){
        const response: responseGetManyComments = await AxiosServices.getDataFromDatabase(`/commentsByOwner?page=${page}&limit=${limit}&${visitor_id? `visitor_id=${visitor_id}`:""}`) as responseGetManyComments
        const comments : Array<Comment> = response.results.map((comment) =>{ return Comment.createNewComment(comment)})
        const nbOfCommments: number = response.count
        return {comments, nbOfCommments}
    }

    static async likeAComment(comment_id:string){
        await AxiosServices.postInDataBase(`/like?comment_id=${comment_id}`,null)
    }
    static async unLikeAComment(comment_id:string){
        console.log("ok")
        await AxiosServices.deleteElementOnServer(`/like/${comment_id}`)
    }
}