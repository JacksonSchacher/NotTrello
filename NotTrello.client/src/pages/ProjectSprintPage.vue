<template>
  <div class="container-fluid">
    <Sprint v-if="sprint.id" :sprint="sprint" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { sprintsService } from '../services/SprintsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await sprintsService.getSprints(route.params.id)
        await projectsService.getProjectById(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
        logger.log('getSprints onMounted', error.message)
      }
    })
    return {
      route,
      sprint: computed(() => AppState.currentSprint),
      sprints: computed(() => AppState.sprints),
      currentProject: computed(() => AppState.currentProject)
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
