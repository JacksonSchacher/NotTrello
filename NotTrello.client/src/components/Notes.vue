<template>
  <div class="card col-11 px-2 pt-2 mb-1">
    <div class="row">
      <div class="col d-flex align-items-center">
        <img :src="note.creator.picture" alt=""><h6 class="ms-2">
          {{ note.creator.name }}
        </h6>
      </div>
    </div>
    <div class="row">
      <p>{{ note.body }}</p>
    </div>
  </div>
  <div class="col-1 d-flex justify-content-center">
    <i class="mdi mdi-delete f-20" @click="deleteNote(note.id)"></i>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { Notes } from '../models/Notes'
import { backlogService } from '../services/BacklogService'
import Pop from '../utils/Pop'
export default {
  props: {
    note: { type: Notes, required: true }
  },
  setup() {
    const route = useRoute()
    return {
      async deleteNote(noteId) {
        try {
          await backlogService.deleteNote(route.params.id, noteId)
          Pop.toast('message deleted', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }

}
</script>

<style scoped lang="scss">
img {
  border-radius: 50%;
  object-fit: cover;
  width: 3rem;
}
</style>
