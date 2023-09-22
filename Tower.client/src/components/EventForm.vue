<template>
    <form @submit.prevent="createEvent">
        <section class="row">
            <div class="col-md-6 col-12">
                <label for="event-name">Name</label>
                <input v-model="eventData.name" id="event-name" class="form-control" minlength="5" maxlength="50" type="text">
            </div>
            <div class="col-md-6 col-12">
                <label for="event-location">Location</label>
                <input v-model="eventData.location" id="event-location" class="form-control" minlength="5" maxlength="50" type="text">
            </div>
            <div class="col-12">
                <label for="event-description">Description</label>
                <input v-model="eventData.description" id="event-description" class="form-control" minlength="5" maxlength="500" type="text">
            </div>
            <div class="col-md-4 col-12">
                <label for="event-capacity">Capacity</label>
                <input v-model="eventData.capacity" id="event-capacity" class="form-control" minlength="10" maxlength="1000000000" type="number">
            </div>
            <div class="col-md-4 col-12">
                <label for="event-startDate">Date</label>
                <input v-model="eventData.startDate" id="event-startDate" class="form-control" type="date">
            </div>

            <div class="col-md-4 col-12">
                <label for="event-event">Type</label>
                <select v-model="eventData.type" class="form-control" id="event-type">
                <option disabled selected value="concert">Please select a category</option>
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
                </select>
            </div>
            <div class="col-12">
            <label for="event-coverImg">Cover Image</label>
                <input v-model="eventData.coverImg" id="event-coverImg" class="form-control" minlength="1" maxlength="1000" type="url">
            </div>
            <div class="col-md-3 col-12">
                <button class="btn btn-primary">Submit</button>
            </div>
            <div class="col-12 p-3">
                <img class="img-prev" :src="eventData.coverImg" alt="">
            </div>
        </section>
    </form>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';

export default {
setup() {
    const eventData = ref({})
    const router = useRouter()
    function resetForm(){
        eventData.value = {category: ''}
    }
    onMounted(() => {
        resetForm
    })
  return {
    eventData,
    async createEvent(){
        try {
        let newEvent = await eventsService.createEvent(eventData.value)
        Pop.toast('Album created!🕺', 'success')
        resetForm()
        router.push({name: 'Event', params: {eventId: newEvent.id}})
        } catch (error) {
            Pop.error(error)
        }
    }
  };
},
};
</script>


<style lang="scss" scoped>
.img-prev{
    max-height: 20vh;
    object-fit: contain;
    object-position: center;
}
</style>