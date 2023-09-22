<template>
   <section class="row border border-1 p-2">
     <div class="col-12 col-md-2">
      <img class="img-fluid profile-pic" :src="comment.creator.picture" alt="">
      <p class="text-center">{{ comment.creator.name }}</p>
      </div>
     <div class="col-md-10 col-12 card">
        <p>{{ comment.body }}</p>
      </div>
      <div class="col-3" v-if="account">
        <button v-if="account.id == comment.creatorId" @click="deleteComment(comment.id)" class="btn btn-danger">Delete<i class="mdi mdi-delete"></i></button>
      </div>
    </section>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { commentsService } from '../services/CommentsService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { eventsService } from '../services/EventsService';
import { useRoute } from 'vue-router';

export default {
  props: {comment: {type: Comment, required: true}},
setup() {
  const route = useRoute();
  return {
    account: computed(() => AppState.account),
    

      async deleteComment(commentId) {
        try {
        if(await Pop.confirm("Are you sure?")){
          logger.log(commentId)
          await commentsService.deleteComment(commentId)
          await eventsService.getCommentsByEventId(route.params.eventId)
          route
        }
        } catch (error) {
          Pop.error(error)
        }

      }
  };
},
};
</script>


<style lang="scss" scoped>
.profile-pic{
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 50em;
}
</style>