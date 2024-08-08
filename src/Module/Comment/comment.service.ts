import { AxiosResponse } from "axios";
import { AxiosServices } from "../HTTP/axios.services";
import { Comment } from "./comment.class";
import { comment } from "./comment.type";
import { AxiosResponseError } from "../HTTP/axiosResponseError.dto";

export class CommentService{
    static async postNewComment(newComment:comment, id_place:string, categorie:"activity"|"restaurant"|"hotel", note: number){
            newComment.note = note
            newComment.categorie = categorie
            const comment: Comment = Comment.createNewComment(newComment)
            const response:AxiosResponse = await AxiosServices.postInDataBase(`/comment?place_id=${id_place}`,comment) as AxiosResponse
            const ResponseError = AxiosResponseError.createNewResponseError(response.data, response.status) 
            return ResponseError
    }
}