import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"
import { Comment } from "../models/Comment.js"
import { Ticket } from "../models/Ticket.js"


class EventsService{

    async createEvent(eventData){
        const res = await api.post('api/events', eventData)
        const newEvent = new Event(res.data)
        AppState.events.unshift(newEvent)
        return newEvent
    }


    async getEvents(){
        const res = await api.get('api/events')
        logger.log('got events', res.data)
        AppState.events = res.data.map(event => new Event(event))
        logger.log('appstate events', AppState.events)
    }

    async getEventById(eventId){
        const res = await api.get(`api/events/${eventId}`)
        // logger.log('got one event', res.data)
        AppState.activeEvent = new Event(res.data)
        // logger.log(AppState.activeEvent)
    }

    async getCommentsByEventId(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('comments', res.data)
        AppState.activeEventComments = res.data.map(com => new Comment(com))
        logger.log('saved comments', AppState.activeEventComments)
    }

    async getTicketsByEventId(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('tickets', res.data)
        AppState.activeEventTickets = res.data.map(ticket => new Ticket(ticket))
    }

    async CancelEvent(eventId){
        const res = await api.delete(`api/events/${eventId}`)
        AppState.events.push(res.data)
    }
}


export const eventsService = new EventsService()