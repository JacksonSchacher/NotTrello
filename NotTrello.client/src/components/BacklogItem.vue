<template>
  <div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <div class="row">
        <div class="accordion-header col-11" id="flush-headingOne">
          <button class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="true"
                  aria-controls="flush-collapseOne"
          >
            <i class="mdi mdi-folder f-24"></i>

            <h4>{{ backlog.name }}</h4>
            <div>Sprints go here</div>
            <i class="mdi mdi-weight"></i>
            <button>Details</button>
            <button ">
              Add Task
            </button>
            <h4>Tasks Completed</h4>
          </button>
        </div>
        <div class="d-flex col-1 align-items-center">
          <i class="mdi mdi-delete f-24 selectable" @click="deleteBacklogItem(backlog.id)"></i>
        </div>
      </div>
      <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div v-for="t in tasks" :key="t.id">
            <Task :task="t" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { Backlog } from '../models/Backlog'
import { backlogService } from '../services/BacklogService'
import { taskService } from '../services/TaskService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    backlog: { type: Backlog, required: true }
  },
  setup() {
    const route = useRoute()
    return {
      tasks: computed(() => AppState.tasks),
      async deleteBacklogItem(backlogId) {
        try {
          await backlogService.deleteBacklogItem(route.params.id, backlogId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async addTask(backlogId) {
        try {
          await taskService.createTask(route.params.id, backlogId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }

}
</script>

<style>

</style>
