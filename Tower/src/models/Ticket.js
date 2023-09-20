import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const TicketSchema = new Schema({
    accountId: { type: ObjectId, required: true, ref: 'Account' },
    eventId: { type: ObjectId, required: true, ref: 'Event' },
}, { toJSON: { virtuals: true } })

TicketSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'Event',
    justOne: true
})