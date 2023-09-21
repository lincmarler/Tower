import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";


export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get("", this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/comments', this.getCommentsInEvent)
            .get('/:eventId/tickets', this.getTicketsByEvent)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)

    }
    async createEvent(req, res, next) {
        try {
            let eventBody = req.body
            eventBody.creatorId = req.userInfo.id
            const event = await eventsService.createEvent(eventBody)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getEvents(req, res, next) {
        try {
            const events = await eventsService.getEvents(req.query)
            res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await eventsService.getEventById(req.params.eventId)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const updates = req.body
            const eventId = req.params.eventId
            const editedEvent = await eventsService.editEvent(eventId, updates)
            res.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next) {
        try {
            const event = await eventsService.cancelEvent(req.params.eventId, req.userInfo.id)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsByEvent(req, res, next) {
        try {
            const tickets = await ticketsService.getTicketsByEvent(req.params.eventId)
            res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getCommentsInEvent(req, res, next) {
        try {
            const comments = await commentsService.getCommentsInEvent(req.params.eventId)
            res.send(comments)
        } catch (error) {
            next(error)
        }
    }
}