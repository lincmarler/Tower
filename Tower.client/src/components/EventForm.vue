<template>
    <form @submit.prevent="createEvent">
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
        <div class="col-12">
            <label for="event-coverImg">Cover Image</label>
            <input v-model="eventData.coverImg" id="event-coverImg" class="form-control" minlength="1" maxlength="1000" type="url">
        </div>
                <div class="col-md-6 col-12">
                    <label for="event-location">Location</label>
                    <input v-model="eventData.location" id="event-location" class="form-control" minlength="5" maxlength="50" type="text">
            </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
setup() {
    const eventData = ref({})
    const router = useRouter()
  return {
    eventData,
  };
},
};
</script>


<style>
</style>