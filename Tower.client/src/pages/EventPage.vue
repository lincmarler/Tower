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
                    </div>
                    <div class="col-12 col-md-2 text-center">
<button class="btn btn-success">Attend💃</button>
                    </div>
                </section>
            </div>
                <section class="row mt-5 p-3">
                    <div class="col-12 bg-secondary">
                        <section class="row">
                            <div class="col-12">
                                Comment form
                            </div>
                            <!-- <div v-for="comment in comments" :key="comment.id" class="col-12">
<CommentCard />
{{ comment.body }}
                            </div> -->
                        </section>
                    </div>
                </section>
            
        </section>
    </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService.js';
// import {commentsService} from '../services/CommentsService.js'

export default {
setup() {
    const inProgress = ref(false);
    const route = useRoute();
    watchEffect(() => {
        getEventById();
        getCommentsByEventId()
    });
async function getCommentsByEventId(){
    try {
        await eventsService.getCommentsByEventId(route.params.eventId)
    } catch (error) {
        Pop.error(error)
    }
}

    async function getEventById(){
        try {
            await eventsService.getEventById(route.params.eventId)
        } catch (error) {
            Pop.error(error)
        }
    }
  return {
    user: computed(() => AppState.user),
    event: computed(() => AppState.activeEvent),
    comment: computed(() => AppState.activeEventComments),
    coverImg: computed(() => `url(${AppState.events.coverImg})`)
  };
},
};
</script>


<style lang="scss" scoped>
.cover-img{
    width: 35vh;
    height: 35vh;
    object-position: center;
    object-fit: cover;
}
</style>