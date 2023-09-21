import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"


class CommentsService {
    async getCommentsInEvent(eventId) {
        await eventsService.getEventById(eventId)
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator event')
        return comments
    }
    async deleteComment(commentId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest(`No comment at ${commentId}`)
        }
        await comment.remove()
        return 'remove the comment'
    }
    async createComment(commentBody) {
        const comment = await dbContext.Comments.create(commentBody)
        await comment.populate('creator')
        return comment
    }

}





export const commentsService = new CommentsService()