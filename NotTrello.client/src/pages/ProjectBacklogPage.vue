<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 m-auto">
        <div class="card bg-transparent shadow">
          <div class="row backlog-bg  justify-content-between rounded-top px-0 mx-0">
            <div class="col-md-10 text-white py-2 project">
              <h4>{{ currentProject.name }} Backlog Items</h4>
              <p>{{ currentProject.description }}</p>
            </div>
            <div class="col-md-2 align-self-end py-2">
              <button class="btn create-button mb-3" data-bs-toggle="modal" data-bs-target="#BacklogItem-modal">
                + Backlog Item
              </button>
            </div>
          </div>
          <div class="backlog-item" v-for="b in backlogs" :key="b.id">
            <BacklogItem :backlog="b" />
          </div>
        </div>
      </div>
    </div>

    <Modal id="BacklogItem-modal">
      <template #modal-title>
        Add New Backlog Item
      </template>
      <template #modal-body>
        <BacklogForm />
      </template>
    </Modal>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { backlogService } from '../services/BacklogService'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'
import { taskService } from '../services/TaskService'
import { sprintsService } from '../services/SprintsService'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await backlogService.getBacklogs(route.params.id)
        await sprintsService.getSprints(route.params.id)
        await projectsService.getProjectById(route.params.id)
        await backlogService.getNotes(route.params.id)
        await taskService.getTasks(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      backlogs: computed(() => AppState.backlogs),
      currentProject: computed(() => AppState.currentProject)
    }
  }
}
</script>

<style scoped lang="scss">
.backlog-bg{
  background-color: rgba(0, 0, 0, 0.616);
}
.project{
  text-shadow: 2px 1px 2px #000000;
}
.create-button{
   border: solid #BABEF8;
  color: white;
}
.create-button:hover{
  border: solid #29ADF8;
  background-color: rgba(0, 0, 0, 0.192);
  color: white;
}
</style>
