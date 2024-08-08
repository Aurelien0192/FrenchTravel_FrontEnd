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

    static async findManyComments(page:number,limit:number, place_id:string, findBy:string, options:string){
        const response:responseGetManyComments = await AxiosServices.getDataFromDatabase(`/comments?page=${page}&limit=${limit}&${findBy}=${place_id}&options=${options}`) as responseGetManyComments
        const comments : Array<Comment> = response.results.map((comment) =>{ return Comment.createNewComment(comment)})
        const nbOfCommments: number  = response.count
        return {comments, nbOfCommments}
    }
}