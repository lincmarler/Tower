<template>
<router-link :to="{path: `events/${event.id}`}">
        <section class="row card p-3 g-2 my-2 event-card-image">
            <div class="col-12">
                <img class="event-image" :src="event.coverImg" alt="">
            </div>
            <div class="col-12">
                {{ event.name }}
            </div>
            <div class="col-12">
                {{ event.startDate }}
            </div>
            <div class="col-12 text-end">
                {{ event.capacity }} spots left!
            </div>
        </section>
</router-link>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';


export default {
    props: {event: {type: Event || Object, required: true}},
setup() {
  return {
    coverImg: computed(() => `url(${AppState.events.coverImg})`)
  };
},
};
</script>


<style lang="scss" scoped>
.event-image{
width: 100%;
object-position: center;
object-fit: contain;

}
</style>
