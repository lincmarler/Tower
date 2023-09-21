import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { EventSchema } from '../models/Event.js';
import { TicketSchema } from '../models/Ticket.js';
import { CommentsSchema } from '../models/Comments.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('Event', EventSchema)
  Tickets = mongoose.model('Tickets', TicketSchema)
  Comments = mongoose.model('Comments', CommentsSchema)
}

export const dbContext = new DbContext()
