<template>
  <div class="accordian accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <div class="row">
        <div class="accordion-header col-11" id="flush-headingOne">
          <button class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#backlog-'+backlog.id"
                  aria-expanded="true"
                  aria-controls="flush-collapseOne"
          >
            <i class="mdi mdi-folder f-24 mb-2"></i>

            <h4>{{ backlog.name }}</h4>
            <div class="mx-3">
              Sprints go here
            </div>
            {{ backlog.weightTotal }}<i class="mdi mdi-weight me-3"></i>
            <div>
              <button class="mx-3"
                      data-bs-toggle="modal"
                      data-bs-target="#backlogDetails-modal"
                      @click="getCurrentBacklogId(backlog.id)"
              >
                Details
              </button>
            </div>
            <div>
              <button data-bs-toggle="modal"
                      data-bs-target="#Task-modal"
                      @click="getCurrentBacklogId(backlog.id)"
              >
                Add Task
              </button>
            </div>
            <h4 class="ms-5">
              Tasks Completed
            </h4>
          </button>
        </div>
        <div class="d-flex col-1 align-items-center text-dark">
          <i class="mdi mdi-delete f-24 selectable" @click="deleteBacklogItem(backlog.id)"></i>
        </div>
      </div>

      <div :id="'backlog-'+backlog.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div v-for="t in tasks" :key="t.id">
            <Task :task="t" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal id="Task-modal">
    <template #modal-title>
      Create Task
    </template>
    <template #modal-body>
      <TaskForm />
    </template>
  </Modal>
  <Modal id="backlogDetails-modal">
    <template #modal-title>
      {{ backlog.name }} Details <i v-if="account.id == backlog.creatorId" class="mdi mdi-pencil selectable"></i>
    </template>
    <template #modal-body>
      <BacklogDetails />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { Backlog } from '../models/Backlog'
import { backlogService } from '../services/BacklogService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    backlog: { type: Backlog, required: true }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks.filter(t => t.backlogItemId === props.backlog.id)),
      async deleteBacklogItem(backlogId) {
        try {
          await backlogService.deleteBacklogItem(route.params.id, backlogId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async getCurrentBacklogId(backlogId) {
        try {
          await backlogService.setBacklog(backlogId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }

}
</script>

<style scoped lang="scss">
</style>
