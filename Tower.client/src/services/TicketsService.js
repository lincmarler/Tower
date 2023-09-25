import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{

    async createTicket(ticketData){
        // logger.log(ticketData)
    const res = await api.post('api/tickets', ticketData)
    logger.log('ticket',res.data)
// logger.log(AppState.activeEventTickets, 'appstate tickets')
AppState.activeEventTickets.push(new Ticket(res.data))
    }

    async deleteTicket(ticketId) {
            const res = await api.delete(`api/tickets/${ticketId}`)
            logger.log(res.data)
            let indexToRemove = AppState.activeEventTickets.findIndex(ticket => ticket.id == ticketId)
            AppState.activeEventTickets.splice(indexToRemove, 1)
    }
}


export const ticketsService = new TicketsService()