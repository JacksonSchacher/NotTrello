<template>
 <div class="container-fluid">
   <div class="row">
     <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
   </div>
 </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { sprintsService } from '../services/SprintsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
name: 'Sprint',
  setup(){
    const route = useRoute()
  onMounted( async () => {
    try {
      await sprintsService.getSprints(route.params.id)
    } catch (error) {
      Pop.toast(error.message, 'error')
      logger.log('getSprints onMounted', error.message)
    }
  })
  return{
    route,
    sprints: computed(() => AppState.sprints),
    project: computed(() => AppState.projects)
  }
}
}
</script>

<style>

</style>