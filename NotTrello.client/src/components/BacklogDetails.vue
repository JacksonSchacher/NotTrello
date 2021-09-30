<template>
  <div class="container-fluid w-100">
    <div v-if="backlog.edit">
      <form @submit.prevent="editDetails()">
        <div class="my-2">
          <label class="form-label" for="name">Update Backlog Item Name</label>
          <div class="form-group">
            <label for="name"></label>
            <input type="text"
                   class="form-control"
                   name="name"
                   id="name"
                   placeholder="Backlog Item Name"
                   v-model="editable.name"
                   required
            >
          </div>
        </div>
        <label class="form-label" for="sprint">Sprint</label>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Assign to Sprint
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li class="selectable" v-for="s in sprints" :key="s.id" @click="assignSprint(s.id)">
              {{ s.name }}
            </li>
          </ul>
        </div>
        <div class="row">
          <label for="status">
            Status
          </label>
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
        <div class="btn-group">
          <button type="submit" class="btn btn-success">
            Save
          </button>
          <button type="reset" class="btn btn-muted">
            Cancel
          </button>
        </div>
      </form>
    </div>
    <div v-else>
      <div class="row">
        <h6>Assigned to:</h6>
        <h5>Sprint 1</h5>
      </div>
      <div class="row">
        <h3 class="mb-3">
          Status
        </h3>
        <div class="status">
          Pending
        </div>
        <div class="status">
          In-Progress
        </div>
        <div class="status">
          Review
        </div>
        <div class="status">
          Done
        </div>
      </div>
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
import { logger } from '../utils/Logger'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      sprints: computed(() => AppState.sprints.filter(s => s.projectId === AppState.currentProject.id)),
      backlog: computed(() => AppState.currentBacklog),
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
      },
      assignSprint(sprintId) {
        editable.value.sprintId = sprintId
        logger.log('Sprint value', editable.value.sprintId)
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
