<template>
  <div class="row">
    <div class="col-8 m-auto">
      <div class="card shadow">
        <div class="row justify-content-between mx-2 mt-3">
          <div class="col-6 py-2 sprint-text">
            <h4> {{ sprint.name }}</h4>
            <p><small>{{ new Date(sprint.endDate).toLocaleDateString() }} - {{ new Date(sprint.startDate).toLocaleDateString() }}</small></p>
          </div>

           <div class="col-2 text-white" v-if="account.id == sprint.creatorId"> 
            <i class="mdi mdi-delete f-20 selectable" @click="deleteSprint(sprint.id)"></i>
            <button class="btn create-button text-white pb-3" data-bs-toggle="modal" data-bs-target="#update-sprint">
            <i class="mdi mdi-pencil f-20 selectable"></i>
            </button>
          </div>
            </div>
        </div>
        <BacklogItem v-for="b in backlogs" :key="b.id" :backlog="b" />
      </div>
    </div>

  <Modal id="update-sprint">
    <template #modal-title>
      Add Sprint
    </template>
    <template #modal-body>
      <CreateSprintForm :sprint="sprint" />
    </template>
  </Modal>
</template>

<script>
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
import { Sprint } from '../models/Sprint'
import { logger } from '../utils/Logger'
import { router } from '../router'
export default {
  props: {
    sprint: { type: Sprint, required: true }
  },
  setup() {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      currentProject: computed(() => AppState.currentProject),
      backlogs: computed(() => AppState.backlogs.filter(b => b.sprintId === AppState.currentSprint.id)),
      async deleteSprint(sprintId) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete?')
          if (!yes) {return}
          await sprintsService.deleteSprint(route.params.id, sprintId)
          router.push({ name: 'Home' })
          
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card{
  background-color: rgba(0, 0, 0, 0.616);
  color: white;
  backdrop-filter: blur(4px);
}
.sprint-text{
  text-shadow: 2px 1px 2px #000000;
}
</style>
