<template>
  <div class="row">
    <div class="col-8 m-auto">
      <div class="card shadow">
        <div class="row justify-content-between mx-2">
          <div class="col-4 py-2 project">
            <p> {{ sprint.name }}</p>
            <div v-if="account.id == sprint.creatorId"> <i class="mdi mdi-delete f-20 selectable" @click="deleteSprint(sprint.id)"></i></div>
             
          </div>
          <div class="col-2 align-self-end py-2">
          </div>
        </div>

        <BacklogItem v-for="b in backlogs" :key="b.id" :backlog="b" />
      </div>
    </div>
  </div>
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
      backlogs: computed(() => AppState.backlogs.filter(b => b.blackItemId === AppState.currentSprint.id)),
      async deleteSprint(sprintId) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete?')
          if (!yes) {return}
          await sprintsService.deleteSprint(route.params.id, sprintId)
          router.push({ name: 'Project.Backlog', params: { id: projectId } })
          
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
