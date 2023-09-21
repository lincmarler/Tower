import { Schema } from "mongoose";



export const CommentsSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    body: { type: String, minLength: 3, maxLength: 300 },
}, { timestamps: true, toJSON: { virtuals: true } })

CommentsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

CommentsSchema.virtual('event', {
    localField: 'creatorId',
    foreignField: 'event',
    ref: 'Event',
    justOne: true
})