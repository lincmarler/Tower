<template>
<div class="container-fluid">
  <!-- STUB Intro box -->
  <section class="row">
    <div class="col-12 mt-5 p-3 bg-dark text-light">
      <h3 class="p-3">Welcome to Tower</h3>
      <h3 class="p-3">Revolutionizing the event game!</h3>
      <h3 class="p-3">Get jiggy wit it</h3>
    </div>
  </section>
  <section v-if="account" class="row">
    <div  class="col-12 mt-3">
      <EventForm/>
    </div>
  </section>
<!-- STUB filter btns -->
  <section class="row bg-info g-3 p-2 rounded my-2">
    <button class="btn col btn-outline-light" @click="filterBy = ''">All</button>
<button class="btn col btn-outline-light" @click="filterBy = 'concert'">Concert</button>
<button class="btn col btn-outline-light" @click="filterBy = 'convention'">Convention</button>
  <button class="btn col btn-outline-light" @click="filterBy = 'sport'">Sport</button>
  <button class="btn col btn-outline-light" @click="filterBy = 'digital'">Digital</button>
  </section>
<!-- STUB Event Cards -->
<section class="row">
  <div v-for="event in events" :key="event.id" class="col-6 col-md-4">
  <EventCard :event="event"/>
  </div>
</section>
</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import {eventsService} from '../services/EventsService.js'
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
import EventForm from '../components/EventForm.vue';

export default {
    setup() {
        onMounted(() => {
            getEvents();
        });
        const filterBy = ref('');
        async function getEvents() {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            filterBy,
            account: computed(() => AppState.account),
            events: computed(() => {
                if (!filterBy.value) {
                    return AppState.events;
                }
                else {
                    return AppState.events.filter(event => event.type == filterBy.value);
                }
            })
        };
    },
    components: { EventCard, EventForm }
}
</script>

<style scoped lang="scss">

</style>
