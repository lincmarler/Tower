import { Schema } from "mongoose";



export const EventSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, minLength: 5, maxLength: 1000 },
    coverImg: { type: String, required: true, maxLength: 750, default: 'https://images.unsplash.com/photo-1599055712783-0f505afa412a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80' },
    location: { type: String, required: true, minLength: 3, maxLength: 30 },
    capacity: { type: Number, required: true, min: 1, max: 1000 },
    startDate: { type: Date, required: true },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], lowercase: true },
    isCanceled: { type: Boolean, required: true, default: false },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },

}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})