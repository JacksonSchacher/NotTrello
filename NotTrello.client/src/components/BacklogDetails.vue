<template>
  <div class="container-fluid w-100">
    <div class="row">
      <h6>Assigned to:</h6>
      <h5>Sprint 1</h5>
    </div>
    <div class="row">
      <h3 class="mb-3">
        Status
      </h3>
      <button type="button" class="btn btn-outline-dark">
        Pending
      </button>
      <button type="button" class="btn btn-outline-dark">
        In-Progress
      </button>
      <button type="button" class="btn btn-outline-dark">
        Review
      </button>
      <button type="button" class="btn btn-outline-dark">
        Done
      </button>
    </div>
    <div class="row text-center">
      <h4>Notes</h4>
    </div>
    <div class="row">
      <form @submit.prevent="addNote()">
        <div class="col d-flex">
          <textarea class="form-control w-75" placeholder="Leave a comment here" id="body" style="height: 100px" v-model="editable.body"></textarea>
          <button type="submit" class="btn btn-success w-25">
            <i class="mdi mdi-send f-28"></i>
          </button>
        </div>
      </form>
    </div>

    <div class="row justify-content-center">
      <div class="d-flex align-items-center" v-for="n in notes" :key="n.id">
        <Notes :note="n" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { backlogService } from '../services/BacklogService'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      notes: computed(() => AppState.notes.filter(n => n.backlogItemId === AppState.currentBacklog.id)),
      editable,
      async addNote() {
        try {
          editable.value.backlogItemId = AppState.currentBacklog.id
          await backlogService.addNote(route.params.id, editable.value)
          editable.value = {}
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.btn-outline-dark {
  width: 6rem;
  border-radius: 10px;
  padding: 0;
  margin-left: .25rem;
}
.row {
  margin-bottom: 2rem;
}

</style>
