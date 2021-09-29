<template>
  <div class="col-md-6">
    <h4>{{ sprint.name }}</h4>
  </div>
</template>

<script>
import { Sprint } from '../models/Sprint'
import { sprintsService } from '../services/SprintsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
props: {
  sprint: { type: Sprint, required: true }
},
setup(props) {
  return{
    async getSprints(projectId){
      try {
        await sprintsService.getSprints(projectId)
      } catch (error) {
        logger.log('getSprints logger', error)
        Pop.toast(error.message, 'error')
      }
    }
  }
}
}
</script>

<style>

</style>