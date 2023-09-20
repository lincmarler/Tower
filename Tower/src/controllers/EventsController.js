import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";


export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get("", this.getEvents)
            .get('/:eventId', this.getEventById)
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
}