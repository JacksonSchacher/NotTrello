<template>
  <div class="card-body selectable" @click="goToBacklog(project.id)">
    <div class="row justify-content-between mx-5">
      <div class="col-2">
    <p>{{ project.name }}</p>
      </div>
      <div class="col-2">
        <img :src="project.creator.picture" class="rounded-circle" height="45" alt="">
      </div>
      <div class="col-2">
    <p>{{ new Date(project.createdAt).toDateString() }}</p>
      </div>
    </div>
</div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Project } from '../models/Project.js'
import { AppState } from '../AppState.js'
import { projectsService } from '../services/ProjectsService.js'
import { router } from '../router.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'

export default {
  props: {
    project: { type: Project, required: true } 
  },
  setup(props) {
    return {
      async goToBacklog(projectId){
        try {
          await projectsService.getBacklog(projectId)
          router.push({name: 'Project', params: {id: projectId}})
        } catch (error) {
          logger.log('goToBackLog function', error.message)
          Pop.toast(error.message, "error")
        }
      }
    }
}
}
</script>

<style scoped lang="scss">
</style>