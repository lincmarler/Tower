import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: null,

  /**@type {import('./models/Event.js').Event[]} */
  events: [],

  /**@type {Event[]} */
myEvents: [],
  /**@type {Event} */
  activeEvent: null,

  /**@type {Comment[]} */
  activeEventComments: [],

  /**@type {Ticket[]} */
  activeEventTickets: []
})
