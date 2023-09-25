<template>
  <div class="about text-center" v-if="account">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container">
    <section class="row"> 
      <div v-for="event in events" :key="event.id" class="col-6">
        <router-link :to="{ path: `events/${event.id}` }">
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
              <div v-if="event.isCanceled" class="col-12 text-danger fw-bold">
                  CANCELED
              </div>
              <div v-if="event.capacity == 0" class="col-12 text-danger fw-bold">
                  AT CAPACITY
              </div>
          </section>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { accountService } from '../services/AccountService';
export default {
  setup() {
watchEffect(() => {
  getMyEvents()
})
    async function getMyEvents(){
      try {
        await accountService.getMyEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      events: computed(() => AppState.myEvents),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
