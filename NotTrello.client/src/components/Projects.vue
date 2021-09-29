<template>
  <div class="row">
    <div class="card-body selectable" @click="goToProjectPage(project.id)">
      <div class="row justify-content-between mx-5">
        <div class="col-2">
          <p>{{ project.name }}</p>
        </div>
        <div class="col-2" v-if="project.creator">
          <img :src="project.creator.picture" class="rounded-circle" height="45" alt="">
        </div>
        <div class="col-2">
          <div class="position-absolute" style="right: 1rem;" v-if="account.id == project.creatorId">
            <i class="mdi mdi-delete f-20 selectable" @click="deleteProject(project.id)"></i>
          </div>
          <p>{{ new Date(project.createdAt).toDateString() }}</p>
        </div>
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
import { backlogService } from '../services/BacklogService.js'

export default {
  props: {
    project: { type: Project, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),

      async deleteProject(projectId) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete?')
          if (!yes) { return }
          await projectsService.deleteProject(props.project.id)
          router.push({ name: 'Home' })
        } catch (error) {
          logger.log('delteProject in Project.vue', error.message)
          Pop.toast(error.message, 'error')
        }
      },
      async goToProjectPage(projectId) {
        try {
          await backlogService.getBacklogs(projectId)
          router.push({ name: 'Project.Backlog', params: { id: projectId } })
        } catch (error) {
          logger.log('goToBackLog function', error.message)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
