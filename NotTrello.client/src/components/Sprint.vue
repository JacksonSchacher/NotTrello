<template>
    <div class="row">
      <div class="col-8 m-auto">
        <div class="card shadow">
          <div class="row justify-content-between mx-2">
            <div class="col-4 py-2 project">
              <h4>{{ currentProject.name }}</h4>
              <p>{{ currentProject.description }}</p>
              <p> {{ sprint.name }}</p>
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
  setup() {
    const route = useRoute()
    return {
    sprint: computed(() => AppState.sprints),
    currentProject: computed(()=> AppState.currentProject),
    backlogs: computed(() => AppState.backlogs),
      async deleteSprint(sprintId) {
        try {
          await sprintsService.deleteSprint(route.params.id, sprintId)
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
