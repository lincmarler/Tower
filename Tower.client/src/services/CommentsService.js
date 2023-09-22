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
        await api.delete(`api/comments/${commentId}`)
        let indexToRemove = AppState.activeEventTickets.findIndex(comment => comment.id == commentId)
        AppState.activeEventTickets.splice(indexToRemove, 1)

    }
}


export const commentsService = new CommentsService()