import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{

async createComment(commentData){
    const res = await api.post('api/comments', commentData)
    AppState.activeEventComments.push(new Comment(res.data))
}

    async deleteComment(commentId) {
        // const res = await api.delete(`api/comments/${commentId}`)
        // logger.log(res.data)
       const comment = AppState.activeEventComments.find(comm => comm.id == commentId)
       logger.log(comment)
    //    comment.remove()
    }
}


export const commentsService = new CommentsService()