import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TicketsService {
    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('event profile')
        if (!ticket) throw new BadRequest('this does not exist')
        if (userId != ticket.accountId) throw new Forbidden("NO YOU SHAIN'T")
        await ticket.remove()
        return `You are no longer attending this event`

    }
    async getTicketsByEvent(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', '-email')
        return tickets
    }
    async getMyTickets(userId) {
        const ticket = await dbContext.Tickets.find({ accountId: userId }).populate({ path: 'event', populate: { path: 'creator ticketCount' } })
        return ticket
    }
    async createTicket(ticketBody) {
        const ticket = await dbContext.Tickets.create(ticketBody)
        await ticket.populate('event')
        await ticket.populate('profile', '-email')
        return ticket
    }

}



export const ticketsService = new TicketsService()