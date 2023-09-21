import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";


export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets');
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }
    async createTicket(req, res, next) {
        try {
            const ticketBody = req.body;
            ticketBody.accountId = req.userInfo.id;

            const ticket = await ticketsService.createTicket(ticketBody);
            res.send(ticket);
        } catch (error) {
            next(error);
        }
    }

    async deleteTicket(req, res, next) {
        try {
            const message = await ticketsService.deleteTicket(req.params.ticketId, req.userInfo.id);
            res.send(message);
        } catch (error) {
            next(error);
        }
    }
}
