<template>
    <div class="container">
        <section class="row mt-5">
            <div class="col-12 bg-dark p-3">
                <section class="row">
                    <div class="col-12 col-md-3">
                        <img class="cover-img img-fluid" :src="event.coverImg" alt="">
                    </div>
                    <div class="col-12 col-md-7 p-3">
                        <h2>{{ event.name }}</h2>
                        <p>{{ event.description }}</p>
                        <p>{{ event.startDate }}</p>
                        <p>There are {{ event.capacity }} spots left!</p>
                        <p>Ticket Count: {{ event.ticketCount }}</p>
                    </div>
                    <div class="col-12 col-md-2 text-center">
                        <button @click="createTicket" v-if="user.isAuthenticated && account.id != ticket.accountId && event.isCanceled && event.capacity == 0" roll="button"  class="btn btn-success">Attend💃</button>
                        <button @click="deleteTicket" v-else roll="button"  class="btn btn-success">Cancel❌</button>
                    </div>
                </section>
            </div>
            <section class="row">
                <div  class="col-12">
                    <img class="ticket-holder" v-for="ticket in tickets" :key="ticket.id" :src="ticket.profile.picture" alt="">
                </div>
            </section>
                <section class="row mt-5 p-3">
                    <div class="col-12 bg-secondary">
                        <section class="row p-3">
                            <div class="col-12 p-2">
                                <form @submit.prevent="createComment">
                                    <label for="body">Body of comment</label>
                                    <input v-model="commentData.body" type="text" class="form-control" maxlength="300" minlength="5" required>
                                    <button class="m-2 btn btn-success">Add Comment <i class="mdi mdi-plus"></i></button>
                                </form>
                            </div>
                            <div v-for="comment in comments" :key="comment.id" class="col-12">
                                <CommentCard :comment="comment"/>
                            </div>
                        </section>
                    </div>
                </section>
            
        </section>
    </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { Event } from '../models/Event';
import { AppState } from '../AppState';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService.js';
import {commentsService} from '../services/CommentsService.js'
import { Comment } from '../models/Comment.js';
import CommentCard from '../components/CommentCard.vue';
import { api } from '../services/AxiosService';
import { logger } from '../utils/Logger';
import {ticketsService} from '../services/TicketsService.js'
import {Ticket} from '../models/Ticket.js'

export default {
    setup() {
        const commentData = ref({})
        const route = useRoute();
        watchEffect(() => {
            getEventById();
            getCommentsByEventId();
        });
        async function getCommentsByEventId() {
            try {
                await eventsService.getCommentsByEventId(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getEventById() {
            try {
                AppState.activeEvent = null
                await eventsService.getEventById(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            commentData,
            user: computed(() => AppState.user),
            ticket: computed(() => AppState.tickets),
            event: computed(() => AppState.activeEvent),
            comments: computed(() => AppState.activeEventComments),
            account: computed(() => AppState.account),
            
            // coverImg: computed(() => `url(${AppState.events.coverImg})`),

            async createComment(){
                try {
                    commentData.value.eventId = route.params.eventId
                    await commentsService.createComment(commentData.value)
                    getCommentsByEventId()
                    Pop.toast('Added comment!', 'success')
                    commentData.value = {}
                } catch (error) {
                    Pop.error(error)
                }
            },

            async createTicket(){
                try {
                    let ticketData = {eventId: route.params.eventId}
                    await ticketsService.createTicket(ticketData)
                } catch (error) {
                    Pop.error(error)
                }
            },
            
            async deleteTicket(){
                try {
                    let ticket = AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)
                    await ticketsService.deleteTicket(ticket.id)
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
    components: { CommentCard }
};
</script>


<style lang="scss" scoped>
.cover-img{
    width: 35vh;
    height: 35vh;
    object-position: center;
    object-fit: cover;
}

.ticket-holder{
    width: 35%;
    aspect-ratio: 1/1;
    border-radius: 10px;
    object-fit: cover;
}
</style>