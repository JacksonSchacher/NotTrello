<template>
    <div class="row">
      <div class="col-8 m-auto">
        <div class="card shadow">
          <div class="row justify-content-between mx-2">
            <div class="col-4 py-2 project">
              <p> {{ currentSprint.name }}</p>
            </div>
            <div class="col-2 align-self-end py-2">
            </div>
          </div>
        
          <BacklogItem v-for="b in backlogs" :key="b.id" :backlog="b"/>
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
export default {
  props: {
    sprint: { type: Object, required: true }
  },
  setup() {
    const route = useRoute()
    return {
    currentSprint: computed(() => AppState.currentSprint),
    sprint: computed(() => AppState.sprints),
    currentProject: computed(()=> AppState.currentProject),
    backlogs: computed(() => AppState.backlogs.filter(b => b.blackItemId === AppState.currentSprints.id)),
      async deleteSprint(sprintId) {
        try {
          await sprintsService.deleteSprint(route.params.id, sprintId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async getCurrentSprint(sprintId) {
        try {
          await sprintsService.getCurrentSprint(sprintId)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log('current spring', sprintId)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
