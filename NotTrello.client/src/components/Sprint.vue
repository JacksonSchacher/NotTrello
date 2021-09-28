<template>
  <div class="col-md-6">
    <h4>{{ sprints.name }}</h4>
    <p>{{  }}</p>
  </div>
</template>

<script>
import { Sprint } from '../models/Sprint'
import { sprintsService } from '../services/SprintsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
props: {
  sprints: { type: Sprint, required: true }
},
setup(props) {
  return{
    async getSprints(projectId){
      try {
        await sprintsService.getSprints(projectId)
      } catch (error) {
        logger.log('getSprints logger', error.message)
        Pop.toast(error.message, 'error')
      }
    }
  }
}
}
</script>

<style>

</style>