import { dbContext } from "../db/DbContext.js"


class TicketsService {
    async createTicket(ticketBody) {
        const ticket = await dbContext.Tickets.create(ticketBody)
        await ticket.populate('event')
        await ticket.populate('profile', '-email')
        return ticket
    }

}



export const ticketsService = new TicketsService()