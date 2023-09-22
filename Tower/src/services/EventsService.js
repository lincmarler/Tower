import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class EventsService {

    async editEvent(eventId, updates, userId) {
        const originalEvent = await dbContext.Events.findById(eventId)
        if (userId != originalEvent.creatorId) {
            throw new Forbidden('NO DUDE')
        }
        if (originalEvent.isCanceled == true) throw new BadRequest('Cannot edit cancelled event')
        if (!originalEvent) throw new Error(`Unbale to find event at ${eventId}`)
        originalEvent.name = updates.name || originalEvent.name
        originalEvent.description = updates.description || originalEvent.description
        originalEvent.location = updates.location || originalEvent.location
        originalEvent.coverImg = updates.coverImg || originalEvent.coverImg
        originalEvent.capacity = updates.capacity || originalEvent.capacity
        originalEvent.startDate = updates.startDate || originalEvent.startDate
        originalEvent.type = updates.type || originalEvent.type
        await originalEvent.save()
        return originalEvent
    }

    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        await event.populate('creator ticketCount')
        return event
    }

    async getEvents(query) {
        const event = await dbContext.Events.find(query).sort('-createdAt').populate('creator ticketCount')
        return event
    }

    async getEventById(eventId) {
        const event = (await dbContext.Events.findById(eventId)).populate('creator ticketCount')
        if (!event) {
            throw new BadRequest(`no event with id:${eventId} `)
        }
        return event
    }

    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId != userId) throw new Forbidden("That ain't yo event!")
        if (event.isCanceled == true) throw new BadRequest('Already Cancelled!')
        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }
}




export const eventsService = new EventsService()