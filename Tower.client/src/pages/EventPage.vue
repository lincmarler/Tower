<template>
    <div class="container-fluid">
        <section class="row ms-3 mt-5">
            <div class="col-12 ms-5 bg-dark p-3">
                <section class="row">
                    <div class="col-12 col-md-3">
                        <img class="cover-img" :src="event.coverImg" alt="">
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
        </section>
    </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';

export default {
setup() {
    const inProgress = ref(false);
    const route = useRoute();
    watchEffect(() => {
        getEventById();
    });
    async function getEventById(){
        try {
            await eventsService.getEventById(route.params.eventId)
        } catch (error) {
            Pop.error(error)
        }
    }
  return {
    user: computed(() => AppState.user),
    event: computed(() => AppState.activeEvent)
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